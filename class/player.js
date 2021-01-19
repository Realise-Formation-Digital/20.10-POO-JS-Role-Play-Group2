    import Participant from './partecipant.js'
    import Weapon from './weapon.js'
    
    // créer un joueur avec 10 points de vie, 0 points d'expérience, 1 point de force, une arme (qui est un créé avec la function Weapon et 2o piéces d'argent)
    class Player extends Participant {

        constructor (name) {
            var initialWeapon = new Weapon("Epee", 0, 1, 1);
                super(name, 10, 0, 1, 1, [initialWeapon], 20)      // créer le joueur en utilisant le constructor de la clase Participant
        } 


       //methods
        show() {
            document.getElementById("inventory").innerHTML = "Name: "+ this._name + "<br>HP: " + this._hp + "<br>XP: " + this._xp + "<br>STR: " + this._str + "<br>END: " + this._end + "<br>Gold: " + this._gold;
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
            if(this.dead()) {
                consola.log("You Died");
                startGame(); }
            }
        }
        run() {
           // function fuir
        }

        // function mourir
        dead () {
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