import Point from "../../model/Point";
import Tile from "../../model/Tile";
import MachineState from "./MachineStats";

class MachineStartState extends MachineState {
    
    public attack(machinePoint: Point, tiles: Tile[][]): void {
        super.attack(machinePoint, tiles);
        this.attackCount += 1
    }
}

export default MachineStartState