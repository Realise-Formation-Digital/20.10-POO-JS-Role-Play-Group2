    
    class joueur {

        //hp = health points // xp = experience points // str = strength points // end = endurance // wpn = weapon (add strength)
        
        constructor(name) {
            this.name = name;
            this.hp = 10;
            this.xp = 0;
            this.str = 1;
            this.end = 1;
            this.wpn = 1;
            this.gold = 20;
        }



            //methods

            fight() {
                
            }  
        
            run() {

            }
    }


        

        //instance de la class joueur
        var joueur1 = new joueur('joueur1');


    
    class NPC {
        constructor(name) {
            this.name = name;
            this.hp = 10;
            this.xp = (xp.random(1-50))
            this.str = 1;
            this.end = 1;
            this.wpn = 1;
            this.gold = 20;

        }
    
    }
