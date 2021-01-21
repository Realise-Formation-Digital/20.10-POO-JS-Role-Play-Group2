import Participant from './participant.js'
import {startGame} from '../game.js'

class Weapon{
    constructor(name, price, str = 0, end = 0) {
        this.name = name;
        this._str = str;
        this._end = end;
        this._price = price;
    }

 }



 export default Weapon