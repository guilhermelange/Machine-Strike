import Direction from "../../model/Direction";
import Machine from "../../model/Machine";
import Point from "../../model/Point";
import Tile from "../../model/Tile";

abstract class MachineState {
    protected machine: Machine

    constructor(...args: any[]) {
        this.machine = args[0];
    }

    public attack(machinePoint: Point, tiles: Tile[][]) {
        const attackDistance = this.machine.attackDistance
        const [x, y] = machinePoint.coor;
        const machine = tiles[x][y].machine as Machine
        const direction = machine.direction

        switch (direction) {
            case Direction.NORTH:
                for (let i = x; i >= 0 && i >= (x - attackDistance); i--) {
                    const tileMachine = tiles[i][y].machine as Machine
                    if (tileMachine && tileMachine.player != machine.player) {
                        
                    }
                }
                break;
        
            default:
                break;
        }

    }

    public canAttack(machinePoint: Point, tiles: Tile[][]): Boolean {
        const [x, y] = machinePoint.coor;

        const machine = this.machine//tiles[x][y].machine as Machine // reativo
        const direction = machine.direction
        let count = 0


        switch (direction) {
            case Direction.NORTH:
                for (let i = x; i >= 0 && i >= (x - machine.attackDistance); i--) {
                    const tileMachine = tiles[i][y].machine as Machine
                    if (tileMachine && tileMachine.player != this.machine.player) {
                        return true
                    }
                }
                break;
            case Direction.SOUTH:
                for (let i = x; i < tiles.length && count <= machine.attackDistance; i++) {
                    const tileMachine = tiles[i][y].machine as Machine
                    if (tileMachine && tileMachine.player != machine.player) {
                        return true
                    }
                    count++
                }
            default:
                break;
        }

        return false;
    }

    protected getCommands(machinePoint: Point, tiles: Tile[]): string[] {
        const commands = [] as string[];
        return commands
    }

    protected nextState() {}
}

export default MachineState