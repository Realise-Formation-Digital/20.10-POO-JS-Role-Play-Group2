import Participant from './participant.js'
import Weapon from './weapon.js'
import { startGame } from '../game.js'

// créer un joueur avec 10 points de vie, 0 points d'expérience, 1 point de force, une arme (qui est un créé avec la function Weapon et 2o piéces d'argent)
class Player extends Participant {

  constructor(name) {
    const initialWeapon = new Weapon("Short Sword", 10, 1, 1);
    super(name, 10, 0, 1+ initialWeapon._str, 1+ initialWeapon._end, 20, [initialWeapon])      // créer le joueur en utilisant le constructor de la clase Participant
  }


  //methods

  show() {
    // create variables strings with weapon parameters
    let wpn = "<br>Weapon: ";
    if (typeof this._wpns != "undefined" && this._wpns != null && this._wpns.length != null && this._wpns.length > 0) {
      wpn += this._wpns[0].name + "(STR: " + this._wpns[0]._str + " END: " + this._wpns[0]._end + " Price: " + this._wpns[0]._price + ")" + " <button id = 'unequip'>Unequip</button>"
    } else { wpn = "" }

    let inv = "<hr>Inventory:";
    if (typeof this._inventory[0] != "undefined" && this._inventory[0] != null && this._inventory.length != null && this._inventory.length > 0) {
      for (let i = 0; i < this._inventory.length; i++) {
        inv += "<br>Weapon: " + this._inventory[i].name + "(STR: " + this._inventory[i]._str + " END: " + this._inventory[i]._end + " Price: " + this._inventory[i]._price + ") <button class = 'equip'>Equip</button>";
      }
    };

    //write character and weapon parameters in html
    document.getElementById("stats").innerHTML = "Name: " + this._name + "<br>HP: " + this._hp + "<br>XP: " + this._xp + "<br>STR: " + this._str + "<br>END: " + this._end + "<br>Gold: " + this._gold + wpn + inv;

    //add functions to buttons
    let unequipBtn = document.getElementById('unequip')
    if (unequipBtn) {
      unequipBtn.addEventListener('click', () => {
        this.unequipWeapon();
      })
    }

    let equipBtns = document.getElementsByClassName("equip");
    for (let i = 0; i < equipBtns.length; i++) {
      if (equipBtns[i]) {
        equipBtns[i].addEventListener('click', () => {
          this.equipWeapon(i);
        })
      }
    }
  }

  /**
   *
   * @param {Object} monster - Monster angainst we want to fight
   */
  fight(monster) {
    console.log("[Player][fight] Player fight against monster", monster)
    let fightPlayer = (this._hp + this._xp + this._end + this._str);
    let fightMonster = (monster._hp + monster._xp + monster._end + monster._str);
    if (fightPlayer >= fightMonster) {
      this._xp += monster._xp;
      this._gold = this._gold + monster._gold;
      console.log("win");
    } else {
      console.log("lose");
      this._hp -= 1;
      if (this.dead()) {
        console.log("You Died");
        startGame();
      }
    }
  }

  run() {
    // function fuir
  }

  // function mourir
  dead() {
    return this._hp === 0
  }

  buyWeapon(weapon) {
    // function acheter une arme
  }

  sellWeapon(weapon, pnj) {
    // function vendre une arme
  }

  equipWeapon(i) {
    // move weapon object from one array to another and change stats
    if (this._wpns.length == 0) {
      this._str += this._inventory[i]._str;
      this._end += this._inventory[i]._end;
      this._wpns.push(this._inventory[i]);
      this._inventory.splice(i, 1);
      this.show();
    } else {
      alert("You already have a weapon!")
    }
  }

  unequipWeapon() {
    // move weapon object from one array to another and change stats
    this._str -= this._wpns[0]._str;
    this._end -= this._wpns[0]._end;
    this._inventory.push(this._wpns[0]);
    this._wpns.splice(0, 1);

    this.show();
  }

  byStrength() {
    // function échanger 100 sous contre un point de force
  }

  buyEndurance() {
    // function échanger 100 sous contre un point d'endurance
  }

}

export default Player
