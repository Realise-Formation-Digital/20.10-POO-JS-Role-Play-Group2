import Player from './player.js'

export default class Game {
  
    #player;
    
    async getPlayer (id) {
        const data = {
            new_player: 'newPlayer',
            id: id
        }

        console.log("[Game][getDataPlayer] Getting data from server with params", id)
        let playerFoundInTheDatabase = null
        //playerFoundInTheDatabase = await window.fetch('/player?id=' + id.toString()).toJSON()
        try {
        
            playerFoundInTheDatabase = fetch("database.php", {
                method: "POST",
                body: JSON.stringify(data),
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json"
                }
            }).then(function(response) {
                console.log("Reponse serveur", response);
            })
        } catch (e) {
            console.error("[Game][getDate] An error occurred", e)
        }
        
        return playerFoundInTheDatabase;
        
    }

  
    createPlayer(name) {
        try {
            console.log("[Game][createPlayer] Creating player on server with params", name)
            this.#player = new Player(name);
        } catch (e) {
            console.error("[Game][createPlayer] An error occured when creating player on server", e)
        }
    }
  
    save() {
      const data = {
        name: this.#player.getName(),
        hp: this.#player.getLife(),
        xp: this.#player.getXp(),
        str: this.#player.getStr(),
        end: this.#player.getSta(),
        weapon: this.#player.getWeapon(),
        //inventory: this.#player.getInventory(),
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