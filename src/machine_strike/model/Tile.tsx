import { Box } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import TileComponent from "../../components/TileComponent";
import TileRendered from "../patterns/decorator/TileRendered";
import FieldType, { getFieldTypeImage } from "./FieldType";
import Machine from "./Machine";
import Point from "./Point";

class Tile implements TileRendered {
    private _machine: Machine | null;
    private _type: FieldType;
    private _point: Point;

    constructor(machine: Machine | null, type: FieldType, point: Point) {
        this._machine = machine;
        this._type = type;
        this._point = point;
    }

    draw(height: number, children: ReactNode): ReactElement {
        return (
            <TileComponent height={height} image={getFieldTypeImage(this._type)}>{children}</TileComponent>
        )
    }

    get machine(): Machine | any {
        return this._machine;
    }

    set machine(machine: Machine) {
        this._machine = machine;
    }

    get point(): Point {
        return this._point;
    }

    set point(point: Point) {
        this._point = point;
    }

    get type(): FieldType {
        return this._type;
    }
}


export default Tile