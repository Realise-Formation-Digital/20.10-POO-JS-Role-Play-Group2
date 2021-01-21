class Weapon {
    constructor(id=0, name, price, str = 0, end = 0) {
        this._id = id;
        this._name = name;
        this._str = str;
        this._end = end;
        this._price = price;
    }

    getName() {
        return this._name;
    }

    getStrenght() {
        return this._str;
    }

    getEndurance() {
        return this._end;
    }

    getPrice() {
        return this._price;
    }


 }
 export default Weapon