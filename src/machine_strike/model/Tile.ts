import FieldType, { getColor } from "./FieldType";
import Machine from "./Machine";

class Tile {
    private _machine: Machine | null;
    private _type: FieldType;

    constructor(machine: Machine | null, type: FieldType) {
        this._machine = machine;
        this._type = type;
    }

    get machine(): Machine | any {
        return this._machine;
    }

    set machine(machine: Machine) {
        this._machine = machine;
    }
}


export default Tile