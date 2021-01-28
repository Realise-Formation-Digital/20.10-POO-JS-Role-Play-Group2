import Participant from './participant.js'
import Weapon from './weapon.js'
import { startGame } from '../game.js'
import Player from './player.js'

    class NPC{        // Les personages non joueur ont plusieurs armes  
        constructor(weapons, player) {  
                   // weapons est une liste nombre d'armes
            let xp = Math.floor(Math.random() * (50)) + 1      // endurance du personages non joueur
 //          weapons.forEach(weapon => {          // boucle pour attribuer un point de force et d'endurance à chaque arme du PNJ
  //         weapon._str = Math.floor(Math.random() * (xp)) + 1;
 //          weapon._end = Math.floor(Math.random() * (xp)) + 1;
 //           });
            this._xp = xp;
            this._weapons = weapons;  
            this._player = player;
        }

        showBuy() {
            let weapons = "<hr>Weapons: ";
            if (typeof this._weapons != "undefined" && this._weapons != null && this._weapons.length != null && this._weapons.length > 0) {
              for (let i = 0; i < this._weapons.length; i++) {
                weapons += "<br>" + this._weapons[i].name + " (STR: " + this._weapons[i]._str + " END: " + this._weapons[i]._end + " Price: " + this._weapons[i]._price + ") <button class = 'buy'>Buy</button>";
              }
            };
        
            //write character and weapon parameters in html
            document.getElementById("list").innerHTML = weapons;
        
            //add functions to buttons

            let buyBtns = document.getElementsByClassName("buy");
            for (let i = 0; i < buyBtns.length; i++) {
              if (buyBtns[i]) {
                buyBtns[i].addEventListener('click', () => {
                  this.buyWeapon(i);
                })
              }
            }
        }
        showSell() {
            let weapons = "<hr>Inventory:";
            if (typeof this._player._inventory[0] != "undefined" && this._player._inventory[0] != null && this._player._inventory.length != null && this._player._inventory.length > 0) {
              for (let i = 0; i < this._player._inventory.length; i++) {
                weapons += "<br>Weapon: " + this._player._inventory[i].name + "(STR: " + this._player._inventory[i]._str + " END: " + this._player._inventory[i]._end + " Price: " + this._player._inventory[i]._price + ") <button class = 'sell'>Sell</button>";
              }
            };
        
            //write character and weapon parameters in html
            document.getElementById("list").innerHTML = weapons;
        
            //add functions to buttons

            let buyBtns = document.getElementsByClassName("sell");
            for (let i = 0; i < buyBtns.length; i++) {
              if (buyBtns[i]) {
                buyBtns[i].addEventListener('click', () => {
                  this.sellWeapon(i);
                })
              }
            }
        }

        sellWeapon(i) {
           // function acheter
           this._player._gold += this._player._inventory[i]._price/2;
           this._weapons.push(this._player._inventory[i]);
           this._player._inventory.splice(i, 1);
           this.showSell();
           this._player.show();
        }

        buyWeapon(i) {
            // function vendre
            if (this._weapons[i]._price <= this._player._gold) {
                this._player._gold -= this._weapons[i]._price;
                this._player._inventory.push(this._weapons[i]);
                this._weapons.splice(i, 1);
                this.showBuy();
                this._player.show();
              } else {
                alert("Not enough gold!")
              }
        }      

    }

    export default NPC