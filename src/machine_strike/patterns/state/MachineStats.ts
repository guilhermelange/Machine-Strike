import Direction from "../../model/Direction";
import Machine from "../../model/Machine";
import Point from "../../model/Point";
import Tile from "../../model/Tile";

abstract class MachineState {
    protected machine: Machine
    protected attackCount: number;
    protected moveCount: number;

    constructor(...args: any[]) {
        this.machine = args[0];
        this.attackCount = 0;
        this.moveCount = 0;
    }

    public attack(machinePoint: Point, tiles: Tile[][]) {
        const machinesToAttack = this.canAttack(machinePoint, tiles)
        const [x, y] = machinePoint.coor;

        if (machinesToAttack.length > 0) {
            const [i, j] = machinesToAttack[0].coor;
            const currentAttack = this.machine.getCombatPower(tiles[x][y])
            const receiverMachine = tiles[i][j].machine as Machine
            const receiverAttack = receiverMachine.getCombatPower(tiles[i][j])
            
            const attackDiff = currentAttack - receiverAttack;

            if (attackDiff > 0) {
                receiverMachine.health -= attackDiff
            } else if (attackDiff == 0) {
                receiverMachine.health -= 1;
                this.machine.health -= 1;
            } else {
                this.machine.health -= attackDiff;
            }
        }
    }

    public canAttack(machinePoint: Point, tiles: Tile[][]): Point[] {
        const machines = [] as Point[];
        const [x, y] = machinePoint.coor;

        const machine = this.machine
        const direction = machine.direction
        let count = 0

        switch (direction) {
            case Direction.NORTH:
                for (let i = x; i >= 0 && i >= (x - machine.attackDistance); i--) {
                    const tileMachine = tiles[i][y].machine as Machine
                    if (tileMachine && tileMachine.player != this.machine.player) {
                        machines.push(tiles[i][y].point);
                    }
                }
                break;
            case Direction.SOUTH:
                for (let i = x; i < tiles.length && count <= machine.attackDistance; i++) {
                    const tileMachine = tiles[i][y].machine as Machine
                    if (tileMachine && tileMachine.player != machine.player) {
                        machines.push(tiles[i][y].point);
                    }
                    count++
                }

            case Direction.EAST:
                for (let j = y; j < tiles.length && count <= machine.attackDistance; j++) {
                    const tileMachine = tiles[x][j].machine as Machine
                    if (tileMachine && tileMachine.player != machine.player) {
                        machines.push(tiles[x][j].point);
                    }
                    count++
                }
            case Direction.WEST:
                for (let j = y; j >= 0 && count <= machine.attackDistance; j--) {
                    const tileMachine = tiles[x][j].machine as Machine
                    if (tileMachine && tileMachine.player != machine.player) {
                        machines.push(tiles[x][j].point);
                    }
                    count++
                }
        }
        return machines;
    }

    protected getCommands(machinePoint: Point, tiles: Tile[]): string[] {
        const commands = [] as string[];
        return commands
    }

    protected nextState() {}
}

export default MachineState