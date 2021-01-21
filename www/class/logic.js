import Player from './player.js'

export default class Game {
  
    #player = null;
    
    async getPlayer (id) {
        const data = {
            existing_player: 'player',
            id: id
        }

        console.log("[Game][getDataPlayer] Getting data from server with params", id)
        let playerFoundInTheDatabase = null
        //playerFoundInTheDatabase = await window.fetch('/player?id=' + id.toString()).toJSON()
        try {
            playerFoundInTheDatabase = await fetch("database.php", {
                method: "POST",
                body: JSON.stringify(data),
                mode: "same-origin",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json"
                }
            })
            console.log(playerFoundInTheDatabase)
            return playerFoundInTheDatabase;
            // }).then(function(response) {
            //     console.log("Reponse serveur", response);
            // })
        } catch (e) {
            console.error("[Game][getDate] An error occurred", e)
        }
        
    }

  
    createPlayer(name) {
        try {
            console.log("[Game][createPlayer] Creating player on server with params", name)
            let player1 = new Player(name);
            //console.log(player1)
        } catch (e) {
            console.error("[Game][createPlayer] An error occured when creating player", e)
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