import Participant from './participant.js'
import Weapon from './weapon.js'
import { startGame } from '../game.js'

// créer un joueur avec 10 points de vie, 0 points d'expérience, 1 point de force, une arme (qui est un créé avec la function Weapon et 2o piéces d'argent)
class Player extends Participant {

  constructor(name) {
    let initialWeapon = new Weapon("Short Sword", 10, 1, 1);

    super(name, 10, 0, 1+ initialWeapon._str, 1+ initialWeapon._end, 20, [initialWeapon], )      // créer le joueur en utilisant le constructor de la clase Participant
  }


  //methods
  nextEncounter(){
    let random = Math.floor(Math.random() * Math.floor(5));
    if(random == 1) {
      return 1
    } else {
      return 5
    }
  }
  show() {
    // create variables strings with weapon parameters
    let wpn = "<br>Weapon: ";
    let str = "<br>STR: " + this._str + " <button id = 'str'>Upgrade</button>";
    let end = "<br>END: " + this._end + " <button id = 'end'>Upgrade</button>";
    if (typeof this._wpns != "undefined" && this._wpns != null && this._wpns.length != null && this._wpns.length > 0) {
      wpn += this._wpns[0].name + "(STR: " + this._wpns[0]._str + " END: " + this._wpns[0]._end + " Price: " + this._wpns[0]._price + ")" + " <button id = 'unequip'>Unequip</button>"
    } else { wpn = "" }

    let inv = "<hr>Inventory:";
    
      for (let i = 0; i < this._inventory.length; i++) {
        if (typeof this._inventory[i] != "undefined" && this._inventory[i] != null && this._inventory.length != null && this._inventory.length > 0) {
        inv += "<br>Weapon: " + this._inventory[i].name + "(STR: " + this._inventory[i]._str + " END: " + this._inventory[i]._end + " Price: " + this._inventory[i]._price + ") <button class = 'equip'>Equip</button>";
      }
    };

    //write character and weapon parameters in html
    document.getElementById("stats").innerHTML = "Name: " + this._name + "<br>HP: " + this._hp + "<br>XP: " + this._xp + str + end + "<br>Gold: " + this._gold + wpn + inv;

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

    let strBtn = document.getElementById('str')
    if (strBtn) {
      strBtn.addEventListener('click', () => {
        this.buyStrength();
      })
    }

    let endBtn = document.getElementById('end')
    if (endBtn) {
      endBtn.addEventListener('click', () => {
        this.buyEndurance();
      })
    }
  }

  /**
   *
   * @param {Object} monster - Monster angainst we want to fight
   */
  fight(monster) {
    // Compare parameters of player and monster
    let fightPlayer = (this._hp +  this._end + this._str);
    let fightMonster = (monster._hp +  monster._end + monster._str);
    // if more stats - win
    if (fightPlayer >= fightMonster) {
      this._xp += 1;
      this._gold += monster._gold;
      this.dropWeapon(monster);   
      if(this._xp === 50){
        alert("You Won!!")
        startGame();
      }
      return "Victory!!";
    } else {
      this._hp -= 1;
      if (this.dead()) {
        alert("You Died");
        startGame();
      } return "Defeat";
    }
  }

  run() {
    // function fuir
    if(this._xp > 0) {
      this._xp -= 1
    }
  }

  // function mourir
  dead() {
    return this._hp === 0
  }

  dropWeapon(monster){
  //if monster have weapon push to invenotry
    if(typeof monster._wpns[0] != "undefined" && monster._wpns[0] != null) {
      this._inventory.push(monster._wpns[0]);
    }
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
    console.log(this._monsters);

    this.show();
  }

  buyStrength() {
    // function échanger 100 sous contre un point de force
    if(this._gold >= 100) {
      this._str += 1;
      this._gold -= 100;
      this.show();
    } else {
      alert("Not enough gold!")
    }
  }

  buyEndurance() {
    // function échanger 100 sous contre un point d'endurance
    if(this._gold >= 100) {
      this._end += 1;
      this._gold -= 100;
      this.show();
    } else {
      alert("Not enough gold!")
    }
  }

}

export default Player
