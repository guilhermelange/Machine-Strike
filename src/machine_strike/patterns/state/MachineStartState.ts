import Point from "../../model/Point";
import Tile from "../../model/Tile";
import MachineOverloadState from "./MachineOverloadState";
import MachineState from "./MachineStats";

class MachineStartState extends MachineState {
    public overload(): void {
        if (this.attackCount > 0 || this.moveCount > 0) {
            this.machine.health -= 2;
            this.nextState();
        } else {
            throw Error("Não efetuado movimento ou ataque para permitir sobrecarga.");
        }
    }
    
    public attack(machinePoint: Point, tiles: Tile[][]): void {
        if (this.attackCount < 1) {
            super.attack(machinePoint, tiles);
            if (this.moveCount <= 0) {
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
        this.machine.state = new MachineOverloadState(this.machine);
    }
    
}

export default MachineStartState