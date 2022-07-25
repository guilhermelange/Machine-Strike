import Machine from "../model/Machine";
import Board from "../model/Board"
import Player from "../model/Player";

// Contém os dados importados como setup do Game
// Singleton
class Settings {
    private static _instance: Settings
    private constructor() {
        this._board = new Board();
        this._machines = new Map<String, Machine>();
        this._machinesFile = "";
        this._boardFile = "";
        this._inventoryFile = "";
        this._playerMachines = new Map<Player, Machine[]>();
    }

    private _machines: Map<String, Machine>;
    private _board: Board;
    private _machinesFile: string;
    private _boardFile: string;
    private _inventoryFile: string;
    private _playerMachines: Map<Player, Machine[]>

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

    public get player_machines() : Map<Player, Machine[]> {
        return this._playerMachines;
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

    public get inventory_file() : string {
        return this._inventoryFile;
    }
    
    public set board_file(board_file : string) {
        this._boardFile = board_file;
    }

    
    public set machines_file(machines_file : string) {
        this._machinesFile = machines_file;
    }

    public set inventory_file(inventory_file : string) {
        this._inventoryFile = inventory_file;
    }

    public set player_machines(player_machines : Map<Player, Machine[]>) {
        this._playerMachines = player_machines;
    }
} 

export default Settings;