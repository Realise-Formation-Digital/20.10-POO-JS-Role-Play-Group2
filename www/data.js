//  CLASSES
// JOUEUR
class joueur {
  constructor(id, pv, xp, atk, arme, or) {
    this.id = id;
    this.pv = pv;
    this.xp = xp;
    this.atk = atk;
    this.arme = arme;
    this.or = or;
  }

  //Methode pour avoir les details sur la page html 
  getStats() {
    return "JOUEUR 1 = PV: "+ this.pv + " " + " XP: " + this.xp + " " + "Attaque: "+ this.atk + " " + "Arme: Epée de légende "+ " " + "Or: "+ this.or
  }
}

joueur1 = new joueur(1, 10, 0, 1, 1, 20);

// MONSTRES
class monstre {
  constructor(id, pv, xp, atk, arme, or) {
    this.id = id;
    this.pv = pv;
    this.xp = xp;
    this.atk = atk;
    this.arme = arme;
    this.or = or;
  }

  //Methode pour avoir les details sur la page html 
  getStats() {
    return "Monstre = PV: "+ this.pv + " " + " XP: " + this.xp + " " + "Attaque: "+ this.atk + " " + "Arme: Aucune " + " " + "Or: "+ this.or
  }
}

monstre1 = new monstre(1, 3, 1, 1, 0, 50);



// FUNCTIONS

// Aller chercher les details joueur
function stats() {
  //console.log("Ciao", joueur1)
  document.getElementById("joueur").innerHTML = joueur1.getStats();
}

// Aller chercher les details monstre
function statsMonstre() {
  document.getElementById("monstre").innerHTML = monstre1.getStats();
}

// ATTAQUER
function attaque() {
  return "Vous portez un coup net et puissant au monstre"
  joueur1.pv = joueur1.pv - monstre1.atk
    if (joueur1.pv<1){
      document.location='mort.html'
    }else {
        return "VICTOIRE!!! Avec de l'experience et de l'or en plus vous continuez le long du tunnel"
      }
    
  
}

