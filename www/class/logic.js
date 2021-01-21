import Player from './player.js'
import Weapon from './weapon.js';

export default class Game {
  
    #player = null;
    
    async getPlayer (id) {
        const data = {
            existing_player: 'player',
        }

        console.log("[Game][getDataPlayer] Getting data from server with params")
        let playerFoundInTheDatabase = null
        //playerFoundInTheDatabase = await window.fetch('/player?id=' + id.toString()).toJSON()
        try {
            return fetch("database.php", {
                method: "GET",
                //body: JSON.stringify(data),
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                  //"Content-Type": "application/json"
                }
            }).then(function(response) {
              if (response.status === 200) {
                return response.json();
              } else {
                return null
              }
              //return response;
            // }).then(function(response) {
            //     console.log("Reponse serveur", response);
            // })
            }).then(function(jsonData) {
              console.log(jsonData)
              console.log(jsonData)

              if (!jsonData.hasOwnProperty("id")) {
                return null
              }

              let inventory = []
              var equiped = null
              for (var i = 0; i < jsonData.inventory.length; i++) {
                weapon = new Weapon(jsonData.inventory[i].id, jsonData.inventory[i].name, jsonData.inventory[i].price, 
                                    jsonData.inventory[i].str, jsonData.inventory[i].end)
                if (jsonData.weapon != null && weapon.id == jsonData.weapon.id)  {
                  equiped = weapon;
                }                 
                inventory.push(weapon);
              }
              
              var player = Player.PlayerFabric(jsonData.id, jsonData.name, jsonData.hp, jsonData.xp, 
                                        jsonData.str, jsonData.end, jsonData.gold, equiped, inventory);
              //console.log(player)
              return player
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
        } catch (e) {
            console.error("[Game][createPlayer] An error occured when creating player", e)
        }
    }

    getWeaponData(weapon) {
      return {
        name: weapon.getName(),
        str: weapon.getStrenght(),
        end: weapon.getEndurance(),
        price: weapon.getPrice()
      }
    }

    getInventoryData() {
      const data = [];
      let weapons = this.#player.getInventory();
      for (var i = 0; i < weapons.length; i++) {// (var i in weapons) {
        let weapon = weapons[i];
        console.log(weapon)
        const entry = this.getWeaponData(weapon)
        // {
        //   name: weapon.getName(),
        //   str: weapon.getStrenght(),
        //   end: weapon.getEndurance(),
        //   price: weapon.getPrice()
        // }
        data.push(entry);
      }
      console.log(data);
      return data;
    }

  
    save() {
      console.log(this.#player)
      const data = {
        name: this.#player.getName(),
        hp: this.#player.getLife(),
        xp: this.#player.getXp(),
        str: this.#player.getStr(),
        end: this.#player.getSta(),
        wpn: this.getWeaponData(this.#player.getWeapon()),
        inventory: this.getInventoryData(),
        gold: this.#player.getGold(),
      };
  
      fetch("/database.php", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        console.log('response', response);
      })
      .catch(function (error) {
        console.error(error);
      });
    }
  }