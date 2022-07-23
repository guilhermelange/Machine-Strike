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