//  CLASSES
// JOUEUR
class joueur {
  constructor(id, pv, xp, force, endurance, arme, or) {
    this.id = id;
    this.pv = pv;
    this.xp = xp;
    this.force = force;
    this.endurance = endurance;
    this.arme = arme;
    this.or = or;
  }

  //Methode pour avoir les details sur la page html 
  getStats() {
    return "PV: "+ this.pv + " " + " XP: " + this.xp + " " + "Force: "+ this.force + " " + "Endurance: "+ this.endurance + " " + "Arme: Epée de légende "+ " " + "Or: "+ this.or
  }
}

joueur1 = new joueur(1, 10, 0, 1, 1, 1, 20);

// PNJ
class pnj {
  constructor(id, pv, xp, force, endurance, arme, or) {
    this.id = id;
    this.pv = pv;
    this.xp = xp;
    this.force = force;
    this.endurance = endurance;
    this.arme = arme;
    this.pr = or;
  }

  //Methode pour avoir les details sur la page html 
  getStats() {
    return "PV: "+ this.pv + " " + " XP: " + this.xp + " " + "Force: "+ this.force + " " + "Endurance: "+ this.endurance + " " + "Arme: Epée de légende "+ " " + "Or: "+ this.or
  }
}

pnj1 = new pnj();

// MONSTRES
class monstre {
  constructor(id, pv, xp, force, endurance, arme, or) {
    this.id = id;
    this.pv = pv;
    this.xp = xp;
    this.force = force;
    this.endurance = endurance;
    this.arme = arme;
    this.or = or;
  }

  //Methode pour avoir les details sur la page html 
  getStats() {
    return "PV: "+ this.pv + " " + " XP: " + this.xp + " " + "Force: "+ this.force + " " + "Endurance: "+ this.endurance + " " + "Arme: Epée de légende "+ " " + "Or: "+ this.or
  }
}

monstrelvl1 = new monstre(1, 3, 1, 1, 1, "aucune", 50);

// ARME
class arme {
  constructor(id, pv, xp, force, endurance, arme, or) {
    this.id = id;
    this.pv = pv;
    this.xp = xp;
    this.force = force;
    this.endurance = endurance;
    this.arme = arme;
    this.or = or;
  }

  //Methode pour avoir les details sur la page html 
  getStats() {
    return "PV: "+ this.pv + " " + " XP: " + this.xp + " " + "Force: "+ this.force + " " + "Endurance: "+ this.endurance + " " + "Arme: Epée de légende "+ " " + "Or: "+ this.or
  }
}

arme1 = new monstre(1, 3, 1, 1, 1, "aucune", 50);

// FUNCTIONS

// Aller chercher les details
function stats() {
  //console.log("Ciao", joueur1)
  document.getElementById("joueur").innerHTML = joueur1.getStats();
}

// ATTAQUER
function attaque() {

}

