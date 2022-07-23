import Machine from "../model/Machine";
import Board from "../model/Board"

// Contém os dados importados como setup do Game
// Singleton
class Settings {
    private static _instance: Settings
    private constructor() {
        this._board = new Board();
        this._machines = new Map<String, Machine>();
        this._machinesFile = "";
        this._boardFile = "";
    }

    private _machines: Map<String, Machine>;
    private _board: Board;
    private _machinesFile: string;
    private _boardFile: string;

    public static getInstance(): Settings {
        if (this._instance == undefined) {
            this._instance = new Settings();
        }

        return this._instance
    }

    
    public get board() : Board {
        return this._board;
    }

    
    public get machines() : Map<String, Machine> {
        return this._machines;
    }
    
    
    public set board(board : Board) {
        this._board = board;
    }

    
    public set machines(machines : Map<String, Machine>) {
        this._machines = machines;
    }

    public get board_file() : string {
        return this._boardFile;
    }

    
    public get machines_file() : string {
        return this._machinesFile;
    }
    
    
    public set board_file(board_file : string) {
        this._boardFile = board_file;
    }

    
    public set machines_file(machines_file : string) {
        this._machinesFile = machines_file;
    }
} 

export default Settings;