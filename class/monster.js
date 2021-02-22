import Participant from './participant.js'

class Monster extends Participant {
       
    constructor (name, weapons) {       // paramètres: nom du monstre et nom de l'arme  

        const xp = Math.floor(Math.random() * (30)) + 1     // point d'expérience aléatoire de 1 à 50
        const str = Math.floor(Math.random() * (xp)) + 1    // force aléatoire de 1 à nom de oint d'expérience
        const end = Math.floor(Math.random() * (xp)) + 1    // force aléatoire de 1 à nom de oint d'expérience
        const gold = Math.floor(Math.random() * (50)) + 1
       // weapons est nul si le monstre n'a pas d'arme)
   //     if (weapon != null) {    // si le monstre a pas une arme, les propriétés force et endurance de l'arme sont aléatoires de 1 à endurance du monstre5 
    //        weapon._str = Math.floor(Math.random() * (xp)) + 1;
    //        weapon._end = Math.floor(Math.random() * (xp)) + 1;
   //         weapons.push(weapon)
    //    }
        

           // sous aléatoire de 0 à 50
         //  let monster1 = new Monster("Werewolf");
        super(name, 1, xp, str, end, gold, [weapons]);      // créer le monstre en utilisant le constructor de la clase Participant
   } 
}

export default Monster