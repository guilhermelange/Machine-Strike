import Player from "../../model/Player";

interface GameViewObserver {
    updatePlayer(player: Player): void;
    reload(): void;
    updateScore(score: number[]): void
    winner(player: Player): void;
}

export default GameViewObserver