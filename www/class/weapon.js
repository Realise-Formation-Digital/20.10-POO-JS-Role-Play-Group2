class Weapon {
    constructor(id = 1, name, price, str = 0, end = 0) {
        this.id = id;
        this.name = name;
        this._str = str;
        this._end = end;
        this._price = price;
    }
 }

 export default Weapon