import Point from "../../model/Point";
import GameViewObserver from "./GameViewObserver";

interface GameViewUC {
    update(): void;

    overload(pointer: Point): void

    escape(): void;

    nextRound(): void;

    pressEnter(pointer: Point): void;

    changeDirection(pointer: Point): void;

    run(pointer: Point): void;

    attack(pointer: Point): void;

    addObserver(obs: GameViewObserver) : void;

    removeObserver(obs: GameViewObserver) : void;
}

export default GameViewUC