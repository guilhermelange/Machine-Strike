import Point from "../../model/Point";
import GameViewUCImpl from "../observer/GameViewUCImpl";
import Command from "./Command";

class EventMoveCommand implements Command {
    private controller: GameViewUCImpl;
    private pointer: Point;
    private lastPointer: Point;

    constructor(controller: GameViewUCImpl, pointer: Point) {
        this.controller = controller;
        this.pointer = pointer;
        this.lastPointer = this.controller.cursor;
    }

    execute(): void {
        this.controller.moveMachine(this.controller.cursor, this.pointer)
    }

    undo(): void {
        this.controller.moveMachine(this.pointer, this.lastPointer);
    }

    redo(): void {
        this.execute();
    }
}

export default EventMoveCommand;