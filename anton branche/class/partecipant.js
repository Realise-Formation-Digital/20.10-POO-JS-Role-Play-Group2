class Participant {
 //hp = health points // xp = experience points // str = strength points // end = endurance // wpn = weapon (wpn adds end & str points)
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

export default Participant