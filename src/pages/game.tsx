import { Container, Flex, Grid, GridItem, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import Router from "next/router";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from 'react-icons/io'
import FieldTerrainInformation from "../components/FieldTerrainInformation";
import MachineInformation from "../components/MachineInformation";
import Settings from "../machine_strike/global/Settings";
import Point from "../machine_strike/model/Point";
import Tile from "../machine_strike/model/Tile";
import TileCursor from "../machine_strike/patterns/decorator/TileCursor";
import TileMachine from "../machine_strike/patterns/decorator/TileMachine";
import TileRendered from "../machine_strike/patterns/decorator/TileRendered";

export default function Game() {
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const cursor = useRef(new Point(7, 4))
    const [cursorState, setCursorState] = useState(new Point(7, 4))
    const settings = Settings.getInstance();
    const board = useRef(settings.board)
    const tiles = useRef(board.current.tiles);

    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }

        window.onkeyup = (event) => {
            const [i, j] = cursor.current.coor
            switch (event.key) {
                case 'ArrowUp':
                    moveCursor(i - 1, j)
                    break;
                case 'ArrowRight':
                    moveCursor(i, j + 1)
                    break;
                case 'ArrowDown':
                    moveCursor(i + 1, j)
                    break;
                case 'ArrowLeft':
                    moveCursor(i, j - 1)
                    break;
            }
        };
    }, []);

    const moveCursor = (i: number, j: number) => {
        if (i >= 0 && j >= 0 && i <= 7 && j <= 7) {
            cursor.current.x = i
            cursor.current.y = j
            setCursorState(new Point(i, j))
        }
    }

    const applyDecorator = (tileRendered: TileRendered, tile: Tile): ReactNode => {
        if (cursorState.equals(tile.point)) {
            tileRendered = new TileCursor(tileRendered);
        }

        if (tile.machine) {
            tileRendered = new TileMachine(tileRendered, tile.machine)
        }

        return tileRendered.draw(height, <></>);
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
                        {tiles.current && tiles.current.map((tile, i) => tile.map((field, j) => (
                            applyDecorator(field, field)
                        )))}
                    </Grid>
                </GridItem>
                <GridItem area={'machine'} bg={formBackground} rounded={6} p={3}>
                    <VStack alignItems={'start'}>
                        <Heading size={'md'}>Informações</Heading>
                        <Text w={'100%'} mt={0}>
                            {tiles && tiles.current[cursorState.x][cursorState.y] && (
                                <FieldTerrainInformation tile={tiles.current[cursorState.x][cursorState.y]} />
                            )}</Text>
                        <Text w={'100%'} mt={0}>
                            {tiles && tiles.current[cursorState.x][cursorState.y].machine && (
                                <MachineInformation machine={tiles.current[cursorState.x][cursorState.y].machine} />
                            )}</Text>
                    </VStack>
                </GridItem>
                <GridItem area={'command'} bg={formBackground} rounded={6} p={3}>
                    <VStack alignItems={'start'}>
                        <Heading size={'md'}>Comandos</Heading>
                    </VStack>
                </GridItem>
                <Flex position={'absolute'} top={3} left={3} w={''} alignItems={'flex-end'} cursor={'pointer'} onClick={() => { Router.push('/') }}>
                    <IoMdArrowRoundBack></IoMdArrowRoundBack>
                </Flex>
            </Grid>
        </Container>
    )
}