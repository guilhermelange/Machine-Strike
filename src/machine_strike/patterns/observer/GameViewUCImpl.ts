import Settings from "../../global/Settings";
import Board from "../../model/Board";
import Machine from "../../model/Machine";
import Player from "../../model/Player";
import Point from "../../model/Point";
import Tile from "../../model/Tile";
import CommandInvoker from "../command/CommandInvoker";
import EventMoveCommand from "../command/EventMoveCommand";
import EventSelectCommand from "../command/EventSelectCommand";
import MachineStartState from "../state/MachineStartState";
import GameViewObserver from "./GameViewObserver";
import GameViewUC from "./GameViewUC";


const settings = Settings.getInstance()
class GameViewUCImpl implements GameViewUC {
    private obs: GameViewObserver[];
    private board: Board;
    private tiles: Tile[][]
    private player: Player;
    private cursorSelected: Point;
    private commandInvoker: CommandInvoker;
    private limitCommand: number = 2;

    constructor() {
        this.obs = []
        this.player = Player.Player1;
        this.board = settings.board;
        this.tiles = this.board.tiles;
        this.cursorSelected = new Point(-1, -1);
        this.commandInvoker = new CommandInvoker();
    }

    get cursor(): Point {
        return this.cursorSelected;
    }

    overload(pointer: Point): void {
        const [x,y] = pointer.coor
        const machine = this.tiles[x][y].machine as Machine
        if (machine) {
            machine.overload();
            for (const item of this.obs) {
                item.reload()
            }
        } else {
            throw Error("Máquina não localizada")
        }
    }

    escape(): void {
        this.commandInvoker.undo();
        for (const item of this.obs) {
            item.reload()
        }
        this.commandInvoker = new CommandInvoker();
    }

    update(): void {
        this.player = Player.Player1;
        this.board = settings.board;
        this.tiles = this.board.tiles;
        this.cursorSelected = new Point(-1, -1);
    }

    nextRound(): void {
        this.player = (this.player == Player.Player1) ? Player.Player2 : Player.Player1;
        settings.player = this.player;
        this.resetMachineState();

        for (const item of this.obs) {
            item.updatePlayer(this.player)
        }
    }

    pressEnter(pointer: Point): void {
        if (this.cursorSelected.x < 0) {
            const [x, y] = pointer.coor
            const machine: Machine = this.tiles[x][y].machine;
            if (machine) {
                console.log(machine.player, this.player);

                if (machine.player == this.player) {
                    const command = new EventSelectCommand(this, pointer);
                    this.commandInvoker.add(command);
                    this.commandInvoker.execute();

                    for (const item of this.obs) {
                        item.reload()
                    }
                } else {
                    throw Error('Máquina de outro jogador') 
                }
            } else {
                throw Error('Não há máquina no campo para selecionar') 
            }
        } else {
            this.validadeMoveRound();
            const command = new EventMoveCommand(this, pointer);
            this.commandInvoker.add(command);
            this.commandInvoker.execute();
            for (const item of this.obs) {
                item.reload()
            }
            this.commandInvoker = new CommandInvoker();
        }
    }

    changeDirection(pointer: Point): void {
        const [x,y] = pointer.coor;
        const machine: Machine = this.tiles[x][y].machine
        if (machine) {
            machine.changeDirection()
            for (const item of this.obs) {
                item.reload()
            }
        } else {
            throw Error('Não há máquina no campo')
        }
    }

    run(pointer: Point): void {
        const [x, y] = pointer.coor
        if (x >= 0) {
            const machine: Machine = this.tiles[x][y].machine
            if (machine) {
                this.setMachineMoveOptions(pointer)
            } else {
                throw Error(`Não há máquina da posição selecionada`)
            }
        } else {
            throw Error(`Necessário selecionar uma máquina para correr`)
        }
    }

    attack(pointer: Point): void {
        this.validadeAttackRound();
        const [x, y] = pointer.coor
        const machine: Machine = this.tiles[x][y].machine
        if (machine && machine.player == this.player) {
            machine.attack(pointer, this.tiles)
            const winner = this.board.verifyDeadMachines();
            for (const item of this.obs) {
                item.updateScore(settings.playerScore)
                item.reload()
            }

            if (winner != null) {
                settings.resetMatch();
                for (const item of this.obs) {
                    item.winner(winner)
                }
            }
        }
    }

    addObserver(observer: GameViewObserver): void {
        this.obs.push(observer);
    }

    removeObserver(observer: GameViewObserver): void {
        this.obs = this.obs.filter(item => item != observer)
    }

    public setMachineMoveOptions(pointMachine: Point) {
        const [x, y] = pointMachine.coor
        const machine: Machine = this.tiles[x][y].machine
        let limitDistance = machine.moveDistance
        
        if (machine) {
            for (let i = 0; i < this.tiles.length; i++) {
                for (let j = 0; j < this.tiles[i].length; j++) {
                    const tile = this.tiles[i][j]
                    const tileDistance = Math.abs(pointMachine.x - tile.point.x) + Math.abs(pointMachine.y - tile.point.y)
                    if (tileDistance <= limitDistance && !tile.machine) {
                        tile.available = true;
                    }
                }
            }
        }
    }

    public moveMachine(pointMachine: Point, pointDestine: Point) {
        const [x, y] = pointMachine.coor
        const [i, j] = pointDestine.coor
        const machine: Machine = this.tiles[x][y].machine
        if (machine && !pointMachine.equals(pointDestine) && this.tiles[i][j].available) {
            machine.move(pointMachine, pointDestine, this.tiles);
            
            this.cursorSelected.x = -1
            this.cursorSelected.y = -1
            this.resetMachineMoveOptions();
        } else {
            throw Error('Máquina não localizada ou campo não disponível!')
        }
    }

    public resetMachineMoveOptions() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                const tile = this.tiles[i][j]
                tile.available = false;
            }
        }
    }

    private resetMachineState() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                const machine = this.tiles[i][j].machine as Machine
                if (machine) {
                    machine.state = new MachineStartState(machine);
                }
            }
        }
    }

    private validadeAttackRound() {
        let count = 0;
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                const machine = this.tiles[i][j].machine as Machine
                if (machine) {
                    count += machine.state.getAttackCount()
                }
            }
        }

        if (count >= this.limitCommand) {
            throw Error("Limite de ataques atingido. Pode ser utilizada Sobrecarga");
        }
    }
    
    private validadeMoveRound() {
        let count = 0
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                const machine = this.tiles[i][j].machine as Machine
                if (machine) {
                    count += machine.state.getMoveCount();
                }
            }
        }

        if (count >= this.limitCommand) {
            throw Error("Limite de movimentação atingido");
        }
    }
}

export default GameViewUCImpl;