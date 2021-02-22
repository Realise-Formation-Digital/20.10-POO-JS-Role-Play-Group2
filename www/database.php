<?php
  // Interaction avec la BD (J'ai mit trop de commentaires pour faciliter la lecture aux membres de mon equipe)
   
  // Définit les constantes de connexion avec la BD
  define("HOST", "maria_db");
  define("PORT", "9000");
  define("DATABASE", "gamerole");
  define("USER", "1001");
  define("PASSWORD", "digital2021");

  // Crée l'objet database.
  $db = new Database(HOST, DATABASE, USER, PASSWORD);
  //$pdo = new PDO('mysql:dbname=comdigital2021batgentil_db;host=127.0.0.1', 'CF', 'digital2021');

  // Vérifie le content type de la variable $_SERVER pour savoir que methode a reçu le serveur
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
  $requestMethod = isset($_SERVER["REQUEST_METHOD"]) ? trim($_SERVER["REQUEST_METHOD"]) : '';

  // Sauvegarde l'application.
  try {
    if ( $requestMethod === 'GET') {      // verifier si recibí un GET o un POST (pour faire Load ou Save dans la BD)
      echo $db->get();     // hacer un query a la BD  (line 60)
      
        // S'il s'agit d'un appel JSON, récupère le JSON et effectue la sauvegarde.
    } else if ($contentType === "application/json") {

      // Récupère le POST data (petit tricks : https://codepen.io/dericksozo/post/fetch-api-json-php). 
      //  = c'est le contenu du json que viene de manager.js (line 110)
      $content = trim(file_get_contents("php://input"));    

      // Transforme le JSON en objet PHP.
      $decoded = json_decode($content, true);
      
      // Vérifie si le JSON est correct.
      if(is_array($decoded)) {     // si ne está vacio 
        echo $db->save($decoded);   // faire le save avec tous les elemnents du joeur
      }
    }  else {
      // Retourne l'erreur.
      echo "Erreur dans les paramètres envoyées au serveur";
    }
  } catch(PDOException $Exception) {
    echo "Une erreur est survenue lors de la sauvegarde";
  }
    
  

  // Class Database qui fait tous le quequetes à la BD  
  class Database {

    private $pdo;

    // Initialise la base de données.
    public function __construct($host, $database, $user, $password) {
      $dsn = "mysql:host=$host;dbname=$database";
      $this->pdo = new PDO($dsn, $user, $password);
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // Chercher le jouer dans la base de données le dernier joueur que j'ai inserté  (line 67)
    public function get() {
      try {
        // Prend le joueur.
        //$player = $this->pdo->query("SELECT * FROM `joueur` WHERE `idjoueur` = (SELECT MAX(`idjoueur`) FROM `joueur`)");

        // Get player from database = retur le dernier jouer qui a été inserté dans la BD
        // consulta de SQL que ma da todos los campos de la tabla jugador del id que tenga la ultima vez que inserté el jugador en la BD
        $sql_player = "SELECT * FROM `joueur` WHERE `idjoueur` = (SELECT MAX(`idjoueur`) FROM `joueur`)";
        $playerObj =  new stdClass();
        foreach($this->pdo->query($sql_player) as $row) {     // en $row j'ai le result de la requete à la BD donc le jour enregistré la dernier fois
          if( isset( $row['idjoueur'] ) ){      // si en $row, il y a un id = le jouer existe donc il faut prendre tous ses donées
            $playerObj->id = $row["idjoueur"];
            $playerObj->name = $row["name"];
            $playerObj->hp = $row["hp"];
            $playerObj->xp = $row["xp"];
            $playerObj->str = $row["str"];
            $playerObj->end = $row["end"];
            $playerObj->gold = $row["gold"];
          }
        }
        if (!isset($playerObj->id)) {    // si en $row n'a pas de id = pas de joueur, il faut retoruner un json vide
          return json_encode("{}");      // retur un json vide 
        }

        // Get weapons of player    = faire une query pour avoir tous les id de la table joueur_arme pour prendre tous les armes qui a le jouer
        $sql_weapon_id = "SELECT * FROM `joueur_arme` WHERE `joueur_idjoueur` = $playerObj->id";
        
        $weapon_ids = [];     // liste oũ je vais garder toutes les armes 
        $active_weapon_id = null;     // id de l'arme equipéé
        foreach($this->pdo->query($sql_weapon_id) as $row) {     // pour tous les armes verifier si j'ai le id de l'arme 
          if( isset( $row['joueur_idjoueur'] ) ){
            $weaponId = $row["arme_idarme"];     // recuperer le id de l'arme 
            if ($row["equipee"] == 1) {          // verifier si l'arme est equipéé pour recupere le id de l'arme equipéé
              $active_weapon_id = $weaponId ;
            }

            $weapon_ids[] = $weaponId;   // ajouter le id de l'arme à une liste de id  donc dnas $weapon_ids, ils sont tous les id de les armes 
          }
        }
        // jusqu'ici j'ai tous le id de les armes, mais je n'ai pas encore les armes donc il faut les chercher dans la table arme pour recupere totres les armes
        $playerObj->inventory = [];
        foreach($weapon_ids as $weapon_id) {   // pour chaque id de cette la liste de id, créer un autre query pour prendre l'arme )
          $sql_weapon = "SELECT * FROM `arme` WHERE `idarme` = $weapon_id";
        
          foreach($this->pdo->query($sql_weapon) as $row) {   // prendre tous les choses qui à l'arme (name, str, end et prix 
            $weaponObj =  new stdClass();
            if( isset( $row['idarme'] ) ){
              $weaponObj->id = $row["idarme"];
              $weaponObj->name = $row["name"];
              $weaponObj->str = $row["str"];
              $weaponObj->end = $row["end"];
              $weaponObj->price = $row["prix"];
            }
            
            $playerObj->weapon = null;   // signifie que l'arme n'est pas equipéé
            if ($weaponObj->id == $active_weapon_id) {
              $playerObj->weapon = $weaponObj;   // arme qui est equipéé
            }

            $playerObj->inventory[] = $weaponObj;   // ajouter l'arme à inventory (qui est une liste)   
          }
        
        }

        return json_encode($playerObj);  // dans cette json on a le jour avec l'arme equuipee et l'inventiare
        // le va a retourner dans la function  echo $db->get(), qui est dans la line 21 
        // ce echo c'est la forme de php de donner sa reponse qui sera un object json qui peut etres vide ou un jouer avec tous ces champs
        // donc le resultat va à return fetch("database.php" (line 12 de manager.js )
      } catch(PDOException $Exception) {
        throw $Exception;
      }
    }


    // Sauvegarde les données dans la base de données = si j'ai reçu de manager.js un POST y non un GET
    public function save($player) {       // reçoie un joeur 

      try {

        // Insérer le joueur = insertar dans la table joeur todos los camos del jugador
        $playerObj = (object) $player;
        echo $playerObj->name;

        $weapon_nb = count($playerObj->wpn);
        $this->pdo->prepare("INSERT INTO `joueur`(`name`, `hp`, `xp`, `str`, `end`, `gold`) 
                              VALUES ('$playerObj->name', $playerObj->hp, $playerObj->xp, $playerObj->str, 
                                      $playerObj->end, $playerObj->gold)")
                   ->execute();
        $player_id = $this->pdo->lastInsertId();   // dernier id que on a inserté

      //  Insérer les armes du joueur.
       $active_weapon_id = null;
       $weapon_ids = [];

       //INSERT INTO `arme`(`idarme`, `name`, `str`, `end`, `prix`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
        
        foreach($playerObj->inventory as $weapon) {   // pour chaque arme faire un query pour inserter les armes
          $weaponObj = (object) $weapon;
          $this->pdo->prepare("INSERT INTO `arme`(`name`, `str`, `end`, `prix`) VALUES 
                              ('$weaponObj->name', $weaponObj->str, $weaponObj->end, $weaponObj->price)")
                     ->execute();
          $weapon_id = $this->pdo->lastInsertId();   // dernier id que on a inserte

          // Vérifie s'il s'agit de l'arme équipée.
          if ($player->weapon != null &&    // si tengo un arme y que está equipada guardo el id del arma en la tabla jugador-arma
              $player->weapon['str'] == $weaponObj->str &&
              $player->weapon['name'] == $weaponObj->name &&
              $player->weapon['end'] == $weaponObj->end &&
              $player->weapon['prix'] == $weaponObj->price) {
                $active_weapon_id = $weapon_id;
          }

          $weapon_ids[] = $weapon_id;
        }

       // Insérer le lien entre les armes et le joueur. = inserter tous les id que j'ai inserté
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
