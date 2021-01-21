

    class NPC {        // Les personages non joueur ont plusieurs armes  
        constructor(weapons) {           // weapons est une liste nombre d'armes
            var xp = Math.floor(Math.random() * (50)) + 1      // endurance du personages non joueur
            weapons.forEach(weapon => {          // boucle pour attribuer un point de force et d'endurance à chaque arme du PNJ
                weapon._str = Math.floor(Math.random() * (xp)) + 1;
                weapon._end = Math.floor(Math.random() * (xp)) + 1;
            });
            this._xp = xp;
            this._weapons = weapons;
            
        }

        sellWeapon(name) {
           // function acheter
        }

        buyWeapon(weapon) {
            // function vendre
        }      

    }

    export default NPC