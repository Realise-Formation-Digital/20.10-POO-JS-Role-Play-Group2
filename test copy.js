    
    class Participant {

        //hp = health points // xp = experience points // str = strength points // end = endurance // wpn = weapon (add strength)

        constructor(name, hp, xp, str, end, wpn, gold) {
            this._name = name;
            this._hp = hp;
            this._xp = xp;
            this._str = str;
            this._end = end;
            this._wpn = wpn;
            this._gold = gold;
        }


            //methods

            fight() {
                
            }  
        
            run() {

            }
    }

    class Joueur extends participant {
       constructor () {
            super('jouer',10, 0, 1, 1, 1, 20) 
       } 
    }
    
    var darioPlay = new Joueur()

    
    class Monstre extends participant {
        constructor () {

            var dario = Math.floor(Math.random() * (50 - 1)) + 1; 
            var anton = Math.floor(Math.random() * (50 - 1)) + 1; 

            super('jouer',10, 0, 1, 1, 1, 20) 
       } 
            $name = 'monstre'
            $hp = 1;
            $xp =  Math.floor(Math.random() * (50 - 1)) + 1; 
            $str = Math.floor(Math.random() * ($hp - 1)) + 1;
            $end = Math.floor(Math.random() * ($hp - 1)) + 1;
            $wpn = Math.floor(Math.random() * (1 - 0)) + 1;
            $golp = Math.floor(Math.random() * (50 - 0)) + 1; 

        }



    class Pnj extends participant {

        constructor(name) {

            const randomInt = Math.floor(Math.random() * (50 - 1)) + 1  

            super(name, randomInt, randomInt, )
        }
     }       

     class arme {
        constructor(arme) {
            this.wpn = $wpn;
            this.str = $str;
            this.end = $end;
            this.gold = $golp;
        }

     }


     //instance de la class joueur
     var joueur1 = new joueur('joueur1');