/* eslint-disable @next/next/no-img-element */
import { Box, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Direction, { getSidesFromDirection } from "../../model/Direction";
import Machine, { Side } from "../../model/Machine";
import TileDecorator from "./TileDecorator";

class TileMachine extends TileDecorator {
    draw(height: number, children: ReactNode): ReactNode {
        const machine = this.arg as Machine;
        const renderSides = getSidesFromDirection(machine.direction, machine.sides)
        const north = renderSides.get(Direction.NORTH)
        const south = renderSides.get(Direction.SOUTH)
        const east = renderSides.get(Direction.EAST)
        const west = renderSides.get(Direction.WEST)

        return (
            <>
                {super.draw(height, 
                    <>{children}
                    <Box position={'absolute'} 
                            w={'100%'} 
                            h={'100%'} 
                            top={0}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            >
                        {/* <img src={`machine/${machine.image}`} alt="" /> */}
                        <Text fontWeight={'bold'}>{machine.name}</Text>
                    </Box>
                    <Box position={'relative'} w={'100%'} h={'100%'} >
                        {north != Side.DEFAULT && (
                            <Box position={'absolute'} w={4} h={2} top={1.5} left={'50%'} transform={'translate(-50%, -50%)'} backgroundColor={north == Side.ARMORED ? 'blue' : 'red'} rounded={12}></Box>
                        )}
                        {south != Side.DEFAULT && (
                            <Box position={'absolute'} w={4} h={2} bottom={-0.5} left={'50%'} transform={'translate(-50%, -50%)'} backgroundColor={south == Side.ARMORED ? 'blue' : 'red'} rounded={12}></Box>
                        )}
                        {east != Side.DEFAULT && (
                            <Box position={'absolute'} w={2} h={4} right={-0.5} top={'50%'} transform={'translate(-50%, -50%)'} backgroundColor={east == Side.ARMORED ? 'blue' : 'red'} rounded={12}></Box>
                        )}
                        {west != Side.DEFAULT && (
                            <Box position={'absolute'} w={2} h={4} left={1.5} top={'50%'} transform={'translate(-50%, -50%)'} backgroundColor={west == Side.ARMORED ? 'blue' : 'red'} rounded={12}></Box>
                        )}
                    </Box>
                    </>)}
            </>
        )
    }
}

export default TileMachine