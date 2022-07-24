import { Box, Container, Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Router from "next/router";
import { ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import { IoMdArrowRoundBack } from 'react-icons/io'
import Settings from "../machine_strike/global/Settings";
import Tile from "../machine_strike/model/Tile";
import TileCursor from "../machine_strike/patterns/decorator/TileCursor";
import TileRendered from "../machine_strike/patterns/decorator/TileRendered";

export default function Game() {
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const cursor = useRef([7,4])
    const [cursorState, setCursorState] = useState([7,4])
    const settings = Settings.getInstance();
    const board = settings.board
    const tiles = board.tiles;


    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }

        window.onkeyup = (event) => {
            const [i,j] = cursor.current
            switch (event.key) {
                case 'ArrowUp':
                    moveCursor(i-1, j)
                    break;
                case 'ArrowRight':
                    moveCursor(i, j+1)
                    break;
                case 'ArrowDown':
                    moveCursor(i+1, j)
                    break;
                case 'ArrowLeft':
                    moveCursor(i, j-1)
                    break;
            }
        };
    }, []);

    const moveCursor = (i: number, j: number) => {
        if (i >= 0 && j >= 0 && i <= 7 && j <= 7) {
            cursor.current = [i, j]
            setCursorState([i, j])
        }
    }

    const applyDecorator = (tile: TileRendered, i: number, j: number): ReactNode => {
        if (cursorState[0] == i && cursorState[1] == j) {
            tile = new TileCursor(tile);
        }
        return tile.draw(height, <></>);
    }

    return (
        <Container maxW={'8xl'} h={'100vh'} pt={4} pb={4}>
            <Grid templateAreas={`"board machine"
                                  "board command"`}
                gridTemplateRows={'3fr 2fr'}
                gridTemplateColumns={'3fr 1fr'}
                gap={2}
                rounded={6}
                h={'100%'}
                w={'100%'}
                position={'relative'}
            >
                <GridItem area={'board'} bg={formBackground} rounded={6} p={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Grid 
                        h={'100%'}
                        w={(height)}
                        ref={ref}
                        templateRows='repeat(8, 1fr)'
                        templateColumns='repeat(8, 1fr)'
                        gap={0.5}
                        >
                        {tiles && tiles.map((tile, i) => tile.map((field, j) => (
                            applyDecorator(field, i, j)
                        )))}
                    </Grid>
                </GridItem>
                <GridItem area={'machine'} bg={formBackground} rounded={6} p={3}>
                    Máquina
                </GridItem>
                <GridItem area={'command'} bg={formBackground} rounded={6} p={3}>
                    Comandos
                </GridItem>
                <Flex position={'absolute'} top={3} left={3} w={''} alignItems={'flex-end'} cursor={'pointer'} onClick={() => {Router.push('/')}}>
                    <IoMdArrowRoundBack></IoMdArrowRoundBack>
                </Flex>
            </Grid>
        </Container>
    )
}