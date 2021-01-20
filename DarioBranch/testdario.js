
//conseil de Marco : Faire le plus d'héritier possible


    //instances de class Personnage = class Joueur, class NPC, class Monster
    //hp = health points // xp = experience points // str = strength points // end = endurance // wpn = weapon (wpn adds end & str points)
    class Personnage {
        constructor (name, hp, xp, str, end, wpn, gold) {
            this._name = name;
            this._hp = hp;
            this._xp = xp;  
            this._str = str;
            this._end = end;
            this._wpn = wpn;
            this._gold = gold;
        }
        
        win() {
            if (xp === 50) {
               return "YOU WON";
            }
        }
        
        
        die(joueur) {
            if (joueur._hp === 0) {
                return "YOU DIED"
            }
        }

        fight() {

            
        }

        run(joueur) {
            joueur._xp = xp - 1;
            if (joueur(xp) = 0){
                xp = 0;
            }
           return "In this world  cowards, will never reach their goals."
        }




    }


    
    
    // 
    class Joueur extends Personnage {
        super (name, hp, xp, str, end, wpn, gold);

        win();

    }

    //nouveau joueur
    var joueur1 = new Joueur("joueur1", 10, 0, 1, 1, 1, 20);


        


    class Monstre extends Personnage {
               
        super (name, hp, xp, str, end, wpn, gold);
    }

    
       //     this._name = name;
         //   this._hp = Math.round(Math.random() * 50)+1;
           // this._xp = Math.round(Math.random() * 50)+1;
            //this._str = Math.round(Math.random() * 50)+1;
            //this._end = Math.round(Math.random() * 50)+1;
            ///this._wpn = (wpn.random(0-1));
            //this._gold = Math.round(Math.random() * 50)+1;
 




