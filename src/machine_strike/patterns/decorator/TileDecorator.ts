import { ReactNode } from "react";
import TileRendered from "./TileRendered";

abstract class TileDecorator implements TileRendered {
    private _tile: TileRendered;

    constructor(...args: any[]) {
        this._tile = args[0] as TileRendered
    }

    draw(height: number, children: ReactNode): ReactNode {
        return this._tile.draw(height, children);
    }
    
}

export default TileDecorator;