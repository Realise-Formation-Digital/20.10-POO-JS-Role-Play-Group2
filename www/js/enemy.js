let enemy; 
let weapon; 
let pnj; 

function Enemy(enemyType, hp, xp, str, spd, gold, wpns) {
    this.enemyType = enemyType;
    this.hp = hp;
    this.xp = xp;
    this.str = str;
    this.spd = spd;
    this.gold = gold;
    this.wpns = wpns;
}

function Weapon (weaponType, hp, xp, str, spd, gold, wpns){
    this.weaponType = weaponType;
    this.hp = hp;
    this.xp = xp;
    this.str = str;
    this.spd = spd;
    this.gold = gold;
    this.wpns = wpns;
}

function PNJ (pnjType, hp, xp, str, spd, gold, wpns){
    this.pnjType = pnjType;
    this.hp = hp;
    this.xp = xp;
    this.str = str;
    this.spd = spd;
    this.gold = gold;
    this.wpns = wpns;
}
