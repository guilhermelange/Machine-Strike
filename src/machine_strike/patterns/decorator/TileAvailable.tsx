import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Player from "../../model/Player";
import TileDecorator from "./TileDecorator";

class TileAvailable extends TileDecorator {
    draw(height: number, children: ReactNode): ReactNode {
        const player = this.arg as Player;

        return (
            <>
                {super.draw(height, 
                    <>{children}<Box position={'absolute'} 
                    w={'100%'} 
                    h={'100%'}
                    top={0}
                    border={'2.5px solid blue'}
                    borderColor={(player == Player.Player1) ? "blue" : "red"}
                    rounded={4}
                    >
                        <Box w={'100%'} h={'100%'} backgroundColor={'green'} rounded={4} opacity={0.2}>
                        </Box>
            </Box></>)}
            </>
        )
    }
}

export default TileAvailable