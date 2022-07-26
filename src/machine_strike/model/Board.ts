import Settings from "../global/Settings";
import Machine from "./Machine";
import Player from "./Player";
import Tile from "./Tile";

class Board {
    private _tiles: Tile[][];
    private _file: string;

    constructor(...args: any[]) {
        this._tiles = [[]] as Tile[][]
        this._file = "";

        switch (args.length) {
            case 1:
                this._tiles = args[0] as Tile[][]
                break;
            case 2:
                this._tiles = args[0] as Tile[][]
                this._file = args[0] as string
                break;
        }
    }

    get tiles(): Tile[][] {
        return this._tiles;
    }

    verifyDeadMachines(): Player | null {
        const tiles = this.tiles;
        const settings = Settings.getInstance();
        let [player1Score, player2Score] = settings.playerScore;
        player1Score = player1Score as number;
        player2Score = player2Score as number;
        let countUser1 = 0
        let countUser2 = 0

        // Clear dead machines
        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                const tile = tiles[i][j];
                const machine = tile.machine as Machine
                if (machine) {
                    if (machine.health <= 0) {
                        if (machine.player == Player.Player1) {
                            player2Score += +machine.victoryPoints;
                        } else {
                            player1Score += +machine.victoryPoints;
                        }
                        tile.setOptMachine(null);
                    }
                }
            }
        }

        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                const tile = tiles[i][j];
                const machine = tile.machine as Machine
                if (machine) {
                    if (machine.player == Player.Player1) {
                        countUser1 += 1
                    } else {
                        countUser2 += 1
                    }
                }
            }
        }

        settings.playerScore = [player1Score, player2Score];
        
        console.log('score', countUser1, countUser2)
        if (countUser2 == 0 || player1Score >= 7) {
            console.log('entrou 01')
            return Player.Player1;
        }

        if (countUser1 == 0 || player2Score >= 7) {
            return Player.Player2;
        }
        return null;
    }

    public toString = () : string => {
        let texto: string = "";
        for (var i = 0; i < this._tiles.length; i++) {
            for (var j = 0; j < this._tiles[i].length; j++) {
                texto += " " + this._tiles[i][j];
            }
            texto += "\n";
        }
        return texto;
    }
}

export default Board