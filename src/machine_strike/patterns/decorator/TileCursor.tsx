import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Player from "../../model/Player";
import TileDecorator from "./TileDecorator";

class TileCursor extends TileDecorator {
    draw(height: number, children: ReactNode): ReactNode {
        const player = this.arg as Player;

        return (
            <>
                {super.draw(height, 
                    <>{children}<Box position={'absolute'} 
                    w={'100%'} 
                    h={'100%'} 
                    bottom={0}
                    border={'3px solid blue'}
                    rounded={4}
                    borderColor={(player == Player.Player1) ? "teal.100" : "red.100"}
                    >
            </Box></>)}
            </>
        )
    }
}

export default TileCursor