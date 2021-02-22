import Player from './player.js'
import Weapon from './weapon.js';

export default class DataManager {
  
    #player = null;
    
    async getPlayer () {     //cette classe retourne toujoues le dernier ID qui a été inserté dans la BD  (line 67 player.js)
        console.log("[DataManager][getPlayer] Getting data from server with params")
        
        try {
            return fetch("database.php", {   // une requete a un fichier php qui va faire la comunication avec la BD
                method: "GET",
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                }
            }).then(function(response) {    // après le return vient ici  donc j'ai la reponse de php qui indique son status en 200 si tout a bien marché
              if (response.status === 200) { // si la reponse es correct je dois retourner un json qui pourrais etre vide si il n'y a aucun jouers
                return response.json();       // retourne un fichier json que m'a donné php donc il va a la line 24
              } else {
                return null
              }
            }).then(function(jsonData) {   // si la reponse est correcte ça veut dire que php m'a retouné un json
              console.log(jsonData)

              if (!jsonData.hasOwnProperty("id")) { // controler qu'il a un id dans la reponse (qui est en format json) car chaque jour a un id
                return null   // si il n'a pas de id = le joueur n'est pas dans la BD
              }
              // chercher toutes l'armes de ce jouer
              let inventory = []
              var equiped = null
              for (var i = 0; i < jsonData.inventory.length; i++) {    // chercher toutes l'armes de ce jouer et 
                weapon = new Weapon(jsonData.inventory[i].id, jsonData.inventory[i].name, jsonData.inventory[i].price, 
                                    jsonData.inventory[i].str, jsonData.inventory[i].end)
                
                if (jsonData.weapon != null && weapon.id == jsonData.weapon.id)  {     // marquer l'arme comme equipee
                  equiped = weapon;   // si le id qui est dans  le chams arme est l'arme qui est equipée
                }                 
                inventory.push(weapon);     // mettre en inventory toutes les armes du jouer et l'arme equipée = arme qui on utilise dans ce moment
              }
         // convertir ma reponse json à un object player dans ma  clase JS
              var player = Player.PlayerFabric(jsonData.id, jsonData.name, jsonData.hp, jsonData.xp, 
                                        jsonData.str, jsonData.end, jsonData.gold, equiped, inventory);
              //console.log(player)
              this.#player = player;
              return player        // retourne le jouer qui existe = qui été dans la BD et va à game.js (line 32) 
            });
        } catch (e) {
            console.error("[Game][getDate] An error occurred", e)
            return null
        }
    }
  
    createPlayer(name) {
        try {
            console.log("[Game][createPlayer] Creating player on server with params", name)
            this.#player = new Player(name);
            return this.#player;
        } catch (e) {
            console.error("[Game][createPlayer] An error occured when creating player", e)
        }
    }

    getWeaponData(weapon) {     // cette methode pour avoir l'arme qui utilice le jouer = arme equipéé
      if (weapon == null) {
        return null   // si le jour n'utilice aucune arme
      }

      // Return json value
      return {
        name: weapon.getName(),
        str: weapon.getStrenght(),
        end: weapon.getEndurance(),
        price: weapon.getPrice()
      }
    }

    getInventoryData() {     // pour chaque arme d'inventory mettre dans une varible intermediare () mettre les chams de l'arme
      const data = [];
      let weapons = this.#player.getInventory();
      for (var i = 0; i < weapons.length; i++) {// (var i in weapons) {
        let weapon = weapons[i];  // dans une varible intermediare () mettre les chams de l'arme
        console.log(weapon)
        const entry = this.getWeaponData(weapon)
        // {
        //   name: weapon.getName(),
        //   str: weapon.getStrenght(),
        //   end: weapon.getEndurance(),
        //   price: weapon.getPrice()
        // }
        data.push(entry);   // liste avec toutes les armes qui sont dans l'inventary
      }
      console.log(data);
      return data;    // cette methode return une liste avec toutes les armes qui sont dans inventory
    }

  
    save() {
      // d'abord il faut converti le joeur à formato json
      const data = {       // creer un object json avec le player avec qui on est en trai de jouer. Cette object a tous les champs du jouer
        name: this.#player.getName(),    // convertir el json cada campo de la clase player
        hp: this.#player.getLife(),
        xp: this.#player.getXp(),
        str: this.#player.getStr(),
        end: this.#player.getSta(),
        wpn: this.getWeaponData(this.#player.getWeapon()),   // appel function de la line 64
        inventory: this.getInventoryData(),         // appel function de la line 77 
        gold: this.#player.getGold(),
      };
     // data es una varaible de estructura json que tiene todos los datos del jugador. la estructura de json es con el nombre y seguido del campo
      fetch("/database.php", {     // cette methode l'a créée Fred.   Appeler le fichier php = faire un quequest avec le string avec les donnes du joeur que on va enregistrer. (le string est en format json)
        method: "POST",            // va a database.php (line 134)
        body: JSON.stringify(data),
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"     // on indique qu'on envoie un fichier json 
        }
      }).then(function (response) {
        console.log('response', response);
      })
      .catch(function (error) {
        console.error(error);
      });
    }
  }