import Game from "./Game"

abstract class GameState {
    protected game: Game

    constructor(...args: any[]) {
        this.game = args[0];
    }

    protected nextState() {}
}

export default GameState