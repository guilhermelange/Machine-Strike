import { ReactNode } from "react";

// Interface used to Decorate
interface TileRendered {
    draw(height: number, children: ReactNode): ReactNode;
}

export default TileRendered
