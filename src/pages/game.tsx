import { Container, Flex, Grid, GridItem, Heading, Text, useColorModeValue, useForceUpdate, VStack } from "@chakra-ui/react";
import Router from "next/router";
import { ReactNode, useLayoutEffect, useReducer, useRef, useState } from "react";
import { IoMdArrowRoundBack } from 'react-icons/io'
import FieldTerrainInformation from "../components/FieldTerrainInformation";
import MachineInformation from "../components/MachineInformation";
import Settings from "../machine_strike/global/Settings";
import Machine from "../machine_strike/model/Machine";
import Player, { getPlayerDesc } from "../machine_strike/model/Player";
import Point from "../machine_strike/model/Point";
import Tile from "../machine_strike/model/Tile";
import TileAvailable from "../machine_strike/patterns/decorator/TileAvailable";
import TileCursor from "../machine_strike/patterns/decorator/TileCursor";
import TileMachine from "../machine_strike/patterns/decorator/TileMachine";
import TileRendered from "../machine_strike/patterns/decorator/TileRendered";
import TileStats from "../machine_strike/patterns/decorator/TileStats";
import Game from "../machine_strike/patterns/state/Game";

const game = new Game();

export default function GameView() {
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    // Lógica
    const settings = Settings.getInstance();
    const board = useRef(settings.board)
    const tiles = useRef(board.current.tiles);
    const cursor = useRef(new Point(7, 4))
    const [cursorState, setCursorState] = useState(new Point(7, 4))
    const cursorSelected = useRef(new Point(-1, -1))
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const playerRef = useRef(Player.Player1)
    const [player, setPlayer] = useState(playerRef.current);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

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
                case 'f':
                    nextRound()
                    break;
                case 'n':
                    changeMachineDirection(cursor.current)
                    break;
                case 'r':
                    runMachine(cursorSelected.current)
                    break;
                case 'a':
                    attack(cursor.current)
                    break;

                case 'Enter':
                    if (cursorSelected.current.x < 0) {
                        const [x, y] = cursor.current.coor
                        if (tiles.current[x][y].machine && (tiles.current[x][y].machine as Machine).player == playerRef.current) {
                            cursorSelected.current.x = cursor.current.x
                            cursorSelected.current.y = cursor.current.y
                            setMachineMoveOptions(cursorSelected.current, false)
                            forceUpdate();
                        }
                    } else {
                        moveMachine(cursorSelected.current, cursor.current)
                        forceUpdate();
                    }
                    break;
            }
        };
    }, []);

    const nextRound = () => {
        playerRef.current = (playerRef.current == Player.Player1) ? Player.Player2 : Player.Player1;
        setPlayer(playerRef.current)
    }


    const attack = (pointMachine: Point) => {
        const [x, y] = pointMachine.coor
        const machine: Machine = tiles.current[x][y].machine
        if (machine) {
            console.log(machine.state.canAttack(pointMachine, tiles.current))
        }
    }

    const runMachine = (pointMachine: Point) => {
        const [x, y] = pointMachine.coor
        if (x >= 0) {
            const machine: Machine = tiles.current[x][y].machine
            if (machine) {
                setMachineMoveOptions(pointMachine, true)
            }
        }
    }

    const setMachineMoveOptions = (pointMachine: Point, run: Boolean = false) =>  {
        const [x, y] = pointMachine.coor
        const machine: Machine = tiles.current[x][y].machine
        let limitDistance = machine.moveDistance
        if (run) {
            limitDistance += 1
        }
        
        if (machine) {
            for (let i = 0; i < tiles.current.length; i++) {
                for (let j = 0; j < tiles.current[i].length; j++) {
                    const tile = tiles.current[i][j]
                    const tileDistance = Math.abs(pointMachine.x - tile.point.x) + Math.abs(pointMachine.y - tile.point.y)
                    if (tileDistance <= limitDistance && !tile.machine) {
                        tile.available = true;
                    }
                }
            }
        }
    }

    const resetMachineMoveOptions = () => {
        for (let i = 0; i < tiles.current.length; i++) {
            for (let j = 0; j < tiles.current[i].length; j++) {
                const tile = tiles.current[i][j]
                tile.available = false;
            }
        }
    }

    const moveMachine = (pointMachine: Point, pointDestine: Point) => {
        const [x, y] = pointMachine.coor
        const [i, j] = pointDestine.coor
        const machine: Machine = tiles.current[x][y].machine
        if (machine && !pointMachine.equals(pointDestine) && tiles.current[i][j].available) {
            tiles.current[i][j].machine = machine
            tiles.current[x][y].setOptMachine(null)
            cursorSelected.current.x = -1
            cursorSelected.current.y = -1
            resetMachineMoveOptions();
        }
    }

    const changeMachineDirection = (pointDestine: Point) => {
        const [x,y] = cursor.current.coor;
        const machine: Machine = tiles.current[x][y].machine
        if (machine) {
            machine.changeDirection()
            
            // Force render state
            cursor.current.x = pointDestine.x
            cursor.current.y = pointDestine.y
            setCursorState(new Point(pointDestine.x, pointDestine.y))
        }
    }

    const moveCursor = (i: number, j: number) => {
        if (i >= 0 && j >= 0 && i <= 7 && j <= 7) {
            cursor.current.x = i
            cursor.current.y = j
            setCursorState(new Point(i, j))
        }
    }

    const applyDecorator = (tileRendered: TileRendered, tile: Tile): ReactNode => {
        if (cursorState.equals(tile.point)) {
            tileRendered = new TileCursor(tileRendered, playerRef.current);
        }

        if (tile.machine) {
            tileRendered = new TileMachine(tileRendered, tile.machine)
            tileRendered = new TileStats(tileRendered, [player, tile])
        }

        if (tile.available) {
            tileRendered = new TileAvailable(tileRendered, playerRef.current)
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
                        <Heading size={'md'}>Instruções</Heading>
                        <Text w={'100%'} mt={0}>
                            <VStack alignItems={'start'} gap={0} bgColor={'whiteAlpha.200'} p={2} rounded={6} w={'100%'}>
                                <Text marginTop={'0 !important'} fontSize={'md'} fontWeight={'bold'}>Rodada: {getPlayerDesc(player ?? Player.Player1)}</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>Jogador 1 (Pontuação): {player1Score}</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>Jogador 2 (Pontuação): {player2Score}</Text>
                            </VStack>
                        </Text>
                        <Text w={'100%'} mt={0}>
                            <VStack alignItems={'start'} gap={0} bgColor={'whiteAlpha.200'} p={2} rounded={6} w={'100%'}>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>f - Finalizar Rodada</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>n - Rotacionar</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>r - Correr</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>a - Atacar</Text>
                            </VStack>
                        </Text>
                    </VStack>
                </GridItem>
                <Flex position={'absolute'} top={3} left={3} w={''} alignItems={'flex-end'} cursor={'pointer'} onClick={() => { Router.push('/') }}>
                    <IoMdArrowRoundBack></IoMdArrowRoundBack>
                </Flex>
            </Grid>
        </Container>
    )
}