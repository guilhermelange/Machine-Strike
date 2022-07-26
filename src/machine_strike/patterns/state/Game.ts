import Player from "../../model/Player"

class Game {
    private _player: Player
    private _pointPlayer1: number;
    private _pointPlayer2: number;


    constructor(...args: any[]) {
        this._pointPlayer1 = 0;
        this._pointPlayer2 = 0;
        this._player = Player.Player1;
    }

    
    public get player() : Player {
        return this._player;
    }

    
    public get pointPlayer1() : number {
        return this._pointPlayer1
    }

    
    public get pointPlayer2() : number {
        return this._pointPlayer2
    }
}

export default Game