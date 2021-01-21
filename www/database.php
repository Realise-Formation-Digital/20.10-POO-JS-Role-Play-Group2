<?php

  // Définit les constantes de connexion.
  define("HOST", "maria_db");
  define("PORT", "9000");
  define("DATABASE", "gamerole");
  define("USER", "1001");
  define("PASSWORD", "digital2021");

  // Crée l'objet database.
  $db = new Database(HOST, DATABASE, USER, PASSWORD);
  //$pdo = new PDO('mysql:dbname=comdigital2021batgentil_db;host=127.0.0.1', 'CF', 'digital2021');

  // Vérifie le content type de la variable $_SERVER
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
  $requestMethod = isset($_SERVER["REQUEST_METHOD"]) ? trim($_SERVER["REQUEST_METHOD"]) : '';

  // Sauvegarde l'application.
  try {
    if ( $requestMethod === 'GET') {
      echo $db->get();

        // S'il s'agit d'un appel JSON, récupère le JSON et effectue la sauvegarde.
    } else if ($contentType === "application/json") {

      // Récupère le POST data (petit tricks : https://codepen.io/dericksozo/post/fetch-api-json-php).
      $content = trim(file_get_contents("php://input"));

      // Transforme le JSON en objet PHP.
      $decoded = json_decode($content, true);
      
      // Vérifie si le JSON est correct.
      if(is_array($decoded)) {
        echo $db->save($decoded);
      }
    }  else {
      // Retourne l'erreur.
      echo "Erreur dans les paramètres envoyées au serveur";
    }
  } catch(PDOException $Exception) {
    echo "Une erreur est survenue lors de la sauvegarde";
  }
    
  

  // Class Database
  class Database {

    private $pdo;

    // Initialise la base de données.
    public function __construct($host, $database, $user, $password) {
      $dsn = "mysql:host=$host;dbname=$database";
      $this->pdo = new PDO($dsn, $user, $password);
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // Chercher le jouer dans la base de données.
    public function get() {
      try {
        // Prend le joueur.
        //$player = $this->pdo->query("SELECT * FROM `joueur` WHERE `idjoueur` = (SELECT MAX(`idjoueur`) FROM `joueur`)");

        // Get player from database
        $sql_player = "SELECT * FROM `joueur` WHERE `idjoueur` = (SELECT MAX(`idjoueur`) FROM `joueur`)";
        $playerObj =  new stdClass();
        foreach($this->pdo->query($sql_player) as $row) {
          if( isset( $row['idjoueur'] ) ){
            $playerObj->id = $row["idjoueur"];
            $playerObj->name = $row["name"];
            $playerObj->hp = $row["hp"];
            $playerObj->xp = $row["xp"];
            $playerObj->str = $row["str"];
            $playerObj->end = $row["end"];
            $playerObj->gold = $row["gold"];
          }
        }
        if (!isset($playerObj->id)) {
          return json_encode("{}");
        }

        // Get weapons of player
        $sql_weapon_id = "SELECT * FROM `joueur_arme` WHERE `joueur_idjoueur` = $playerObj->id";
        
        $weapon_ids = [];
        $active_weapon_id = null;
        foreach($this->pdo->query($sql_weapon_id) as $row) {
          if( isset( $row['joueur_idjoueur'] ) ){
            $weaponId = $row["arme_idarme"];
            if ($row["equipee"] == 1) {
              $active_weapon_id = $weaponId ;
            }

            $weapon_ids[] = $weaponId;
          }
        }

        $playerObj->inventory = [];
        foreach($weapon_ids as $weapon_id) {
          $sql_weapon = "SELECT * FROM `arme` WHERE `idarme` = $weapon_id";
        
          foreach($this->pdo->query($sql_weapon) as $row) {
            $weaponObj =  new stdClass();
            if( isset( $row['idarme'] ) ){
              $weaponObj->id = $row["idarme"];
              $weaponObj->name = $row["name"];
              $weaponObj->str = $row["str"];
              $weaponObj->end = $row["end"];
              $weaponObj->price = $row["prix"];
            }
            
            $playerObj->weapon = null;
            if ($weaponObj->id == $active_weapon_id) {
              $playerObj->weapon = $weaponObj;
            }

            $playerObj->inventory[] = $weaponObj;
          }
        
        }

        return json_encode($playerObj);
        
      } catch(PDOException $Exception) {
        throw $Exception;
      }
    }


    // Sauvegarde les données dans la base de données.
    public function save($player) {

      try {
        // Vide préalablement les données.
        //$this->pdo->prepare("DELETE FROM joueur_arme")->execute();
        //$this->pdo->prepare("DELETE FROM joueur")->execute();
        //$this->pdo->prepare("DELETE FROM arme")->execute();


        print("Before insert player");
        // Insérer le joueur.
        $playerObj = (object) $player;
        echo $playerObj->name;

        $weapon_nb = count($playerObj->wpn);
        $this->pdo->prepare("INSERT INTO `joueur`(`name`, `hp`, `xp`, `str`, `end`, `gold`) 
                              VALUES ('$playerObj->name', $playerObj->hp, $playerObj->xp, $playerObj->str, 
                                      $playerObj->end, $playerObj->gold)")
                   ->execute();
        $player_id = $this->pdo->lastInsertId();

      //  Insérer les armes du joueur.
       $active_weapon_id = null;
       $weapon_ids = [];

       //INSERT INTO `arme`(`idarme`, `name`, `str`, `end`, `prix`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
        
        foreach($playerObj->inventory as $weapon) {
          $weaponObj = (object) $weapon;
          $this->pdo->prepare("INSERT INTO `arme`(`name`, `str`, `end`, `prix`) VALUES 
                              ('$weaponObj->name', $weaponObj->str, $weaponObj->end, $weaponObj->price)")
                     ->execute();
          $weapon_id = $this->pdo->lastInsertId();

          // Vérifie s'il s'agit de l'arme équipée.
          if ($player->weapon['str'] == $weaponObj->str &&
              $player->weapon['name'] == $weaponObj->name &&
              $player->weapon['end'] == $weaponObj->end &&
              $player->weapon['prix'] == $weaponObj->price) {
                $active_weapon_id = $weapon_id;
          }

          $weapon_ids[] = $weapon_id;
        }

       // Insérer le lien entre les armes et le joueur.
       foreach($weapon_ids as $weapon_id) {
         $is_active_weapon = $active_weapon_id == $weapon_id ? 1 : 0;
           // , equiped)
         // VALUES ($player_id, $weapon_id, $is_active_weapon)")
         $this->pdo->prepare("INSERT INTO `joueur_arme`(`joueur_idjoueur`, `arme_idarme`, `equipee`)
                             VALUES ($player_id, $weapon_id, $is_active_weapon)")
                    ->execute();
        }  

        return "OK";
        
      } catch(PDOException $Exception) {
        print($Exception);
        throw $Exception;
      }
    }



  }


    // // // Charger les données depuis la base de données.
    // // public function load() {

    // // }