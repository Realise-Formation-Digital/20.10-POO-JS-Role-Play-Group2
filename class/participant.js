class Participant {

    constructor(name, hp, xp, str, end, gold, wpns) {
        this._name = name;
        this._hp = hp;
        this._xp = xp;
        this._str =  str + wpns[0]._str;
        this._end = end + wpns[0]._end;
        this._gold = gold;
        this._wpns = wpns;
        this._inventory = [];
    }         
}

export default Participant