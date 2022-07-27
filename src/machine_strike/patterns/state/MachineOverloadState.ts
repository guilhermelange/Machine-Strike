import Point from "../../model/Point";
import Tile from "../../model/Tile";
import MachineStartState from "./MachineStartState";
import MachineState from "./MachineStats";

class MachineOverloadState extends MachineState {
    overload(): void {
        throw new Error("Máquina já encontra-se em sobrecarga.");
    }
    
    public attack(machinePoint: Point, tiles: Tile[][]): void {
        if (this.attackCount < 1) {
            super.attack(machinePoint, tiles);
            if (this.moveCount = 0) {
                this.moveCount += 1;
            }
        } else {
            throw Error("Necessário sobrecarga para efetuar ataque");
        }
    }

    public move(machinePoint: Point, pointDestine: Point, tiles: Tile[][]): void {
        if (this.moveCount < 1) {
            super.move(machinePoint, pointDestine, tiles);
        } else {
            throw Error("Necessário sobrecarga para efetuar movimento");
        }
    }

    protected nextState(): void {
        this.machine.state = new MachineStartState(this.machine);
    }
    
}

export default MachineOverloadState