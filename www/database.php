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

  // S'il s'agit d'un appel JSON, récupère le JSON et effectue la sauvegarde.
  if ($contentType === "application/json") {

    // Récupère le POST data (petit tricks : https://codepen.io/dericksozo/post/fetch-api-json-php).
    $content = trim(file_get_contents("php://input"));

    // Transforme le JSON en objet PHP.
    $decoded = json_decode($content, true);

    // Vérifie si le JSON est correct.
    if(is_array($decoded)) {
      // Sauvegarde l'application.
      try {
        if (isset($decoded["new_player"])) {
          print("SAVE PLAYER");
          echo $db->save($decoded);
        }
        else {
          print("GET PLAYER");
          echo $db->get($decoded["id"]);
        }
      } catch(PDOException $Exception) {
        echo "Une erreur est survenue lors de la sauvegarde";
      }
    } else {
      // Retourne l'erreur.
      echo "Erreur dans les paramètres envoyées au serveur";
    }
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

    // Prend les jouer dans la base de données.
    public function get($id) {
      echo $id;
      try {
        // Prend le joueur.
        $player = $this->pdo->query("SELECT * FROM joueur WHERE idjoueur = $id");
        return json_encode($player);
        
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
        $this->pdo->prepare("INSERT INTO joueur (name, hp, xp, str, end, wpn, gold)
                            VALUES ($playerObj->name, $playerObj->hp, $playerObj->xp, $playerObj->str, $playerObj->end, $playerObj->wpn, $playerObj->gold);")
                   ->execute();
        $player_id = $this->pdo->lastInsertId();


        // Insérer les armes du joueur.
        $active_weapon_id = null;
        $weapon_ids = [];
        
    //     foreach($playerObj->inventory as $weapon) {
    //       $weaponObj = (object) $weapon;
    //       $this->pdo->prepare("INSERT INTO arme (str, end, prix)
    //                            VALUES ($weaponObj->str, $weaponObj->end, $weaponObj->price)")
    //                  ->execute();
    //       $weapon_id = $this->pdo->lastInsertId();

    //       // Vérifie s'il s'agit de l'arme équipée.
    //       if ($player->weapon['str'] == $weaponObj->str &&
    // //          $player->weapon['name'] == $weaponObj->name &&
    //           $player->weapon['end'] == $weaponObj->end &&
    //           $player->weapon['prix'] == $weaponObj->price) {
    //             $active_weapon_id = $weapon_id;
    //           }

    //       $weapon_ids[] = $weapon_id;
    //   }

        // Insérer le lien entre les armes et le joueur.
     //   foreach($weapon_ids as $weapon_id) {
    //      $is_active_weapon = $active_weapon_id == $weapon_id ? 1 : 0;
           //  , equiped)
         //  VALUES ($player_id, $weapon_id, $is_active_weapon)")
    //      $this->pdo->prepare("INSERT INTO joueur_arme (joueur_idjoueur, arme_idarme)
    //                          VALUES ($player_id, $weapon_id)")
     //                ->execute();
        }

       return 'Données sauvegardées';
      } catch(PDOException $Exception) {
        print($Exception);
        throw $Exception;
      }
    }

    // Charge les données depuis la base de données.
    public function load() {

    }

  }

