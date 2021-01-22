import Participant from './partecipant.js'
import Weapon from './weapon.js'
import {startGame} from '../game.js'

// créer un joueur avec 10 points de vie, 0 points d'expérience, 1 point de force, une arme (qui est un créé avec la function Weapon et 2o piéces d'argent)
class Player extends Participant {
    constructor(name) {
      const initialWeapon = new Weapon(1,"Epee", 0, 1, 1);
      super(1, name, 10, 0, 1, 1, initialWeapon, 20);     // créer le joueur en utilisant le constructor de la clase Participant
      this._inventory = [initialWeapon]
    }

  static PlayerFabric(id, name, hp, xp, str, end, gold, weapon, inventory) {
    let player = new Player(name)
    player._id = id;
    player._hp = hp;
    player._xp = xp;
    player._str = str;
    player._end = end;
    player._gold = gold;
    player._wpns = weapon;
    player.inventory = inventory;

    return player;
  }


      //methods
  show() {
    console.log("[Player][show] Showing player")
    document.getElementById("inventory").innerHTML = "Name: " + this._name + "<br>HP: " + this._hp + "<br>XP: " + this._xp + "<br>STR: " + this._str + "<br>END: " + this._end + "<br>Gold: " + this._gold;
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

  getId() {
    return this._id;
  }

  getXp() {
    return this._xp;
  }

  getLife() {
    return this._hp;
  }

  getStr() {
    return this._str;
  }


  getSta() {
    return this._end;
  }

  getWeapon() {
    return this._wpns;
  }

  getName() {
    return this._name;
  }

  getGold() {
    return this._gold ;
  } 

  getInventory() {
    return this._inventory;
  }
  

 // life: this.#player.getLife(),  = this._hp = hp;
 // xp: this.#player.getXp(),   = this._xp = xp;
 // str: this.#player.getStr(),   = this._str = str;
 // sta: this.#player.getSta(),   = this._end = end;
 // weapon: this.#player.getWeapon(),   = this._wpns = wpns;
 // inventory: this.#player.getInventory(), = this._name = name; 
 // gold: this.#player.getGold(),  = this._gold = gold;

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

  takeWeapon(weapon) {
    // function équiper une arme

  }

  leaveWeapon(weapon) {
    // function déséquiper une arme
  }

  byStrength() {
    // function échanger 100 sous contre un point de force
  }

  buyEndurance() {
    // function échanger 100 sous contre un point d'endurance
  }

}


export default Player