import Point from "../../model/Point";
import GameViewUC from "../observer/GameViewUC";
import GameViewUCImpl from "../observer/GameViewUCImpl";
import Command from "./Command";

class EventSelectCommand implements Command {
    private controller: GameViewUCImpl;
    private pointer: Point;
    constructor(controller: GameViewUCImpl, pointer: Point) {
        this.controller = controller;
        this.pointer = pointer;
    }

    execute(): void {
        const cursorSelected = this.controller.cursor;
        cursorSelected.x = this.pointer.x
        cursorSelected.y = this.pointer.y
        this.controller.setMachineMoveOptions(cursorSelected)
    }
    
    undo(): void {
        const cursor = this.controller.cursor
        cursor.x = -1;
        cursor.y = -1;
        this.controller.resetMachineMoveOptions();
    }

    redo(): void {
        this.execute();
    }
}

export default EventSelectCommand;