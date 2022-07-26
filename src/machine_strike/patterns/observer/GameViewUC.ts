import Point from "../../model/Point";
import IndexViewObserver from "./IndexViewObserver";

interface GameViewUC {
    pressEnter(pointer: Point): void | never;

    nextRound(): void | never;

    changeMachineDirection(pointer: Point): void | never;

    addObserver(obs: IndexViewObserver) : void;

    removeObserver(obs: IndexViewObserver) : void;
}

export default GameViewUC