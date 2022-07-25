import { ReactNode } from "react";
import TileRendered from "./TileRendered";

abstract class TileDecorator implements TileRendered {
    private _tile: TileRendered;
    arg: any;

    constructor(...args: any[]) {
        this._tile = args[0] as TileRendered
        if (args.length > 1) {
            this.arg = args[1]
        }
    }

    draw(height: number, children: ReactNode): ReactNode {
        return this._tile.draw(height, children);
    }
    
}

export default TileDecorator;