    
//hp = health points // xp = experience points // str = strength points // end = endurance // wpn = weapon 

    class Weapon {
        constructor(name, price, str = 0, end = 0) {
            this.name = name;
            this._str = str;
            this._end = end;
            this._price = price;
        }
     }


    class Participant {

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

    // créer un joueur avec 10 points de vie, 0 points d'expérience, 1 point de force, une arme (qui est un créé avec la function Weapon et 2o piéces d'argent)
    class Joueur extends Participant {
        constructor (name) {
            var initialWeapon = new Weapon("Epee", 0, 1, 1);
                super(name, 10, 0, 1, 1, [initialWeapon], 20)      // créer le joueur en utilisant le constructor de la clase Participant
        } 


       //methods = functions

        fight() {
            // function combattre
        }  

        run() {
           // function fuir
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
    
    class Monstre extends Participant {
       
        constructor (name, weapon) {       // paramètres: nom du monstre et nom de l'arme  

            const xp = Math.floor(Math.random() * (50)) + 1     // point d'expérience aléatoire de 1 à 50
            const str = Math.floor(Math.random() * (xp)) + 1    // force aléatoire de 1 à nom de point d'expérience
            const end = Math.floor(Math.random() * (xp)) + 1    // force aléatoire de 1 à nom de point d'expérience

            var weapons = []         // weapons est nul si le monstre n'a pas d'arme)
            if (weapon != null) {    // si le monstre a pas une arme, les propriétés force et endurance de l'arme sont aléatoires de 1 à endurance du monstre
                weapon._str = Math.floor(Math.random() * (xp)) + 1;
                weapon._end = Math.floor(Math.random() * (xp)) + 1;
                weapons.push(weapon)     // add new elements to the array 
            }
            
            const gold = Math.floor(Math.random() * (51))    // sous aléatoire de 0 à 50

            super(name, 1, xp, str, end, weapons, gold);      // créer le monstre en utilisant le constructor de la clase Participant
       } 
    }



    class Pnj {        // Les personages non joueur ont plusieurs armes  
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


     //instance de la class joueur
     var joueur = new Joueur('Joueur1');

     //instance de la class nonstre avec 2 paramètres: name du monstre et array arme (name, prix) OU name et array null si le monstre n'a pas d'arme
     var monstre = new Monstre("Monstre1", new Weapon("Espada", 30));
     var monstre1 = new Monstre("Monstre2", null);

     // instance de la clase pnj avec 2 armes (chaque arme a un name et un prix)
     var pnj = new Pnj([new Weapon("Flecha", 10), new Weapon("Misil", 50)]);
     