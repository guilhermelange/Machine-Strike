import Point from "../../model/Point";
import GameViewObserver from "./GameViewObserver";

interface GameViewUC {
    update(): void;

    nextRound(): void;

    pressEnter(pointer: Point): void | never;

    changeDirection(pointer: Point): void | never;

    run(pointer: Point): void;

    attack(pointer: Point): void | never;

    addObserver(obs: GameViewObserver) : void;

    removeObserver(obs: GameViewObserver) : void;
}

export default GameViewUC