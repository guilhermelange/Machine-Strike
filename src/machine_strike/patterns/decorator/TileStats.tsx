import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Machine from "../../model/Machine";
import Player from "../../model/Player";
import Tile from "../../model/Tile";
import TileDecorator from "./TileDecorator";

class TileStats extends TileDecorator {
    draw(height: number, children: ReactNode): ReactNode {
        const player = this.arg[0] as Player;
        const tile = this.arg[1] as Tile;
        const machine = tile.machine as Machine;
        const combatPower = machine.getCombatPower(tile)
        
        return (
            <>
                {super.draw(height,
                    <>{children}
                        <Box position={'absolute'} w={'100%'} h={'100%'}>
                            <Box position={'relative'} w={'100%'} h={'100%'}>
                                <Box position={'absolute'} bottom={0} left={1} rounded={12} fontWeight={'bold'}>{+combatPower}</Box>
                                <Box position={'absolute'} bottom={0} right={1} rounded={12} fontWeight={'bold'} color={'red.400'}>{machine.health}</Box>
                            </Box>
                        </Box>
                    </>)}
            </>
        )
    }
}

export default TileStats