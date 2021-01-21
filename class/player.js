import Participant from './participant.js'
import Weapon from './weapon.js'
import {startGame} from '../game.js'

// créer un joueur avec 10 points de vie, 0 points d'expérience, 1 point de force, une arme (qui est un créé avec la function Weapon et 2o piéces d'argent)
class Player extends Participant {

  constructor(name) {
    const initialWeapon = new Weapon("Short Sword", 0, 1, 1);
    super(name, 10, 0, 1, 1, 20, [initialWeapon])      // créer le joueur en utilisant le constructor de la clase Participant
  }

  test(){
    console.log("124142412412124142412")
  }

  //methods

  show() {
    let inv = "<hr>Inventory:";
    if(typeof this._inventory[0] != "undefined" && this._inventory[0] != null && this._inventory.length != null && this._inventory.length > 0){
    for(let i = 0; i < this._inventory.length; i++){
      inv += "<br>Weapon: " + this._inventory[i].name + "(STR: " + this._inventory[i]._str + " END: " + this._inventory[i]._end + " Price: " + this._inventory[i]._price + ") <button id = 'equip'>Equip</button>";
      let btnElement = document.getElementById('equip')
      btnElement.addEventListener('click', () => {
       this.equipWeapon();
    })
}};

let wpn = "<br>Weapon: ";
        if(typeof this._wpns != "undefined" && this._wpns != null && this._wpns.length != null && this._wpns.length > 0) {
       wpn += this._wpns[0].name + "(STR: " + this._wpns[0]._str + " END: " + this._wpns[0]._end + " Price: " + this._wpns[0]._price + ")" + " <button id = 'unequip'>Unequip</button>" 
    } else { wpn = ""}

    console.log("[Player][show] Showing player")

    document.getElementById("stats").innerHTML = "Name: " + this._name + "<br>HP: " + this._hp + "<br>XP: " + this._xp  + "<br>STR: " + this._str + "<br>END: " + this._end + "<br>Gold: " + this._gold +
    wpn + inv;
    const buttonElement = document.getElementById('unequip')
    buttonElement.addEventListener('click', () => {
      this.unequipWeapon();
  })
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

  equipWeapon(weapon) {
    // function équiper une arme

  }

  unequipWeapon() {
    // function déséquiper une arme
    this._inventory.push(this._wpns[0]);
    this._wpns.splice(0,1);
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
