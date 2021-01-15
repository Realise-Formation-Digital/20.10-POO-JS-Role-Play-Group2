    
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


    class monster {
        constructor(name) {
            this.name = name;
            this.hp = Math.round(Math.random() * 50)+1;
            this.xp = Math.round(Math.random() * 50)+1;
            this.str = Math.round(Math.random() * 50)+1;
            this.end = Math.round(Math.random() * 50)+1;
            this.wpn = Math.round(Math.random() * 1);
            this.gold = Math.round(Math.random() * 50)+1;
        }

    }
        //instance de la class monstre
        var monster1 = new monster('monster1');
        

