    

    class Weapon {
        constructor(name, price, str = 0, end = 0) {
            this.name = name;
            this._str = str;
            this._end = end;
            this._price = price;
        }

     }


    class Participant {

        //hp = health points // xp = experience points // str = strength points // end = endurance // wpn = weapon (add strength)

        constructor(name, hp, xp, str, end, wpns, gold) {
            this._name = name;
            this._hp = hp;
            this._xp = xp;
            this._str = str;
            this._end = end;
            this._wpns = wpns;
            this._gold = gold;
        }


            
    }

    class Joueur extends Participant {
        constructor (name) {
            let initialWeapon = new Weapon("Epee", 0, 1, 1);
                super(name,10, 0, 1, 1, [initialWeapon], 20) 
        } 

       //methods

        fight() {

        }  

        run() {
            this._xp = Math.max(0, this._xp -1);
        }

        buyWeapon(weapon) {
            if (weapon._xp <= this._xp && weapon.price <= this._gold) {
                this._gold -= weapon.price;
                this._weapons.push(weapon);
            }
        }

        sellWeapon(weapon, pnj) {
            this._weapons = this._weapons.filter(myWeapon => {
                if (myWeapon == weapon && !weapon.taken && weapon.price > 0) {
                    this._gold += pnj.buyWeapon(myWeapon);
                    return false;
                }
                return true;
            })
        }

        takeWeapon(weapon) {
            this._weapons.forEach(myWeapon => {
                if (myWeapon == weapon) {
                    this._str += weapon._str;
                    this._end += weapon._end;
                    weapon.taken = true;
                }
            })  

        } 

        leaveWeapon(weapon) {
            this._weapons.forEach(myWeapon => {
                if (myWeapon == weapon) {
                    this._str -= weapon._str;
                    this._end -= weapon._end;
                    weapon.taken = false;
                }
            })  
        }

        byStrength() {
            if (this._gold >= 100) {
                this._gold -= 100
                this._str += 1
            }
        }

        buyEndurance() {
            if (this._gold >= 100) {
                this._gold -= 100
                this._end += 1
            }
        }

    }
    
    class Monstre extends Participant {
        
        // Name of the monster and weapon (null if the moster doesnt have any weapon)
        constructor (name, weapon) {    

            const xp = Math.floor(Math.random() * (50)) + 1
            const str = Math.floor(Math.random() * (xp)) + 1
            const end = Math.floor(Math.random() * (xp)) + 1

            var weapons = []
            if (weapon != null) {
                weapon._str = Math.floor(Math.random() * (xp)) + 1;
                weapon._end = Math.floor(Math.random() * (xp)) + 1;
                weapons.push(weapon)
            }
            

            const gold = Math.floor(Math.random() * (51))

            super(name, 1, xp, str, end, weapons, gold);
       } 
    }



    class Pnj {
        // List of weapons
        constructor(weapons) {
            var xp = Math.floor(Math.random() * (50)) + 1
            weapons.forEach(weapon => {
                weapon._str = Math.floor(Math.random() * (xp)) + 1;
                weapon._end = Math.floor(Math.random() * (xp)) + 1;
            });
            this._xp = xp;
            this._weapons = weapons;
            
        }

        sellWeapon(name) {
            this.weapons.forEach(weapon => {
                if(weapon.name == name) {
                    return {...weapon};
                }
            })
        }

        buyWeapon(weapon) {
            if (!weapon.taken)
                return weapon.price / 2;
            
            return 0;
        }
     }      




     //instance de la class joueur
     var joueur = new Joueur('joueur1');

     var monstre = new Monstre("Alicia", new Weapon("Espada", 30))
     var monstre1 = new Monstre("Alicia1", null)

     var pnj = new Pnj([new Weapon("Flecha", 10), new Weapon("Misil", 50)]);
     pnj
