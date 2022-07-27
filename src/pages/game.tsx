import { Box, Container, Flex, Grid, GridItem, Heading, Text, useColorModeValue, useForceUpdate, useToast, VStack } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { ReactNode, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { IoMdArrowRoundBack } from 'react-icons/io'
import FieldTerrainInformation from "../components/FieldTerrainInformation";
import MachineInformation from "../components/MachineInformation";
import Settings from "../machine_strike/global/Settings";
import Player, { getPlayerDesc } from "../machine_strike/model/Player";
import Point from "../machine_strike/model/Point";
import Tile from "../machine_strike/model/Tile";
import TileAvailable from "../machine_strike/patterns/decorator/TileAvailable";
import TileCursor from "../machine_strike/patterns/decorator/TileCursor";
import TileMachine from "../machine_strike/patterns/decorator/TileMachine";
import TileRendered from "../machine_strike/patterns/decorator/TileRendered";
import TileStats from "../machine_strike/patterns/decorator/TileStats";
import GameViewObserver from "../machine_strike/patterns/observer/GameViewObserver";
import GameViewUCImpl from "../machine_strike/patterns/observer/GameViewUCImpl";

class GameManager implements GameViewObserver  {
    updateScore(score: number[]): void {}
    winner(player: Player): void {}
    reload(): void {}
    updatePlayer(player: Player): void {}
}  

const manager: GameManager = new GameManager();
let controller = new GameViewUCImpl();
controller.addObserver(manager);
const settings = Settings.getInstance()

export default function GameView() {
    // React Utils
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const toast = useToast()

    const board = useRef(settings.board)
    const tiles = useRef(board.current.tiles);
    const cursor = useRef(new Point(7, 4))
    const [cursorState, setCursorState] = useState(new Point(7, 4))
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const playerRef = useRef(Player.Player1)
    const [player, setPlayer] = useState(playerRef.current);
    const [playerScore, setPlayerScore] = useState([0, 0]);

    useLayoutEffect(() => {
        manager.updatePlayer = (currentPlayer: Player) => {
            playerRef.current = currentPlayer
            setPlayer(playerRef.current )   
        }

        manager.reload = () => {
            forceUpdate();
        }

        manager.updateScore = (score: number[]) => {
            setPlayerScore(score);
        }

        manager.winner = (player: Player) => {
            const message = `Vencedor: ${getPlayerDesc(player)}!!!`
            successMessage(message);
            successMessage("Você será redirecionado para o Start em 10 segundos.")
            settings.resetMatch();
            setTimeout(() => {
                Router.push('/')
            }, 10000)
            window.localStorage.setItem("reload", "true")
        }
        
        controller.update()
    }, [])

    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }

        window.onkeyup = (event) => {
            const [i, j] = cursor.current.coor
            try {
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
                    case 'r':
                        controller.overload(cursor.current);
                        break;
                    case 'f':
                        controller.nextRound()
                        break;
                    case 'n':
                        controller.changeDirection(cursor.current);
                        break;
                    case 'a':
                        controller.attack(cursor.current)
                        break;
                    case 'Enter':
                        controller.pressEnter(cursor.current);
                        break;
                    case 'Escape':
                        controller.escape();
                        break;
                }
            } catch(error) {
                console.log(error)
                errorMessage(error)
            }
        };
    }, []);

    useEffect(() => {
        forceUpdate();
    }, [])

    const errorMessage = (error: any) => {
        toast({
            description: "" + error,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right'
        })
    }

    const successMessage = (message: string) => {
        toast({
            description: message,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'bottom-right'
        })
    }

    const handleRedirect = () => {
        window.localStorage.setItem("reload", "true")
        Router.push('/')
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

    try {
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
                                <Text marginTop={'0 !important'} fontSize={'sm'}>Jogador 1 (Pontuação): {playerScore[0]}</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}>Jogador 2 (Pontuação): {playerScore[1]}</Text>
                            </VStack>
                        </Text>
                        <Text w={'100%'} mt={0}>
                            <VStack alignItems={'start'} gap={0} bgColor={'whiteAlpha.200'} p={2} rounded={6} w={'100%'}>
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>Setas</Text> - Movimentar cursor</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>Enter</Text> - Selecionar / Mover</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>Esc</Text> - Desselecionar</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>f</Text> - Finalizar rodada</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>n</Text> - Rotacionar máquina</Text>
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>r</Text> - Sobrecarga</Text>
                                {/* <Text marginTop={'0 !important'} fontSize={'sm'}>r - Correr</Text> */}
                                <Text marginTop={'0 !important'} fontSize={'sm'}><Text fontWeight={'bold'} display={'inline'}>a</Text> - Atacar</Text>
                                
                                
                            </VStack>
                        </Text>
                    </VStack>
                </GridItem>
                <Flex position={'absolute'} top={3} left={3} w={''} alignItems={'flex-end'} cursor={'pointer'} onClick={handleRedirect}>
                    <IoMdArrowRoundBack></IoMdArrowRoundBack>
                </Flex>
            </Grid>
        </Container>
    ) } catch(Error) {
        return (
            <Container  maxW={'8xl'} h={'100vh'} pt={4} pb={4}>
                <Box>
                    <Text cursor={'pointer'}>Erro ao carregar conteúdo. Retorne à tela inicial: 
                        <Text onClick={handleRedirect} display={'inline'}><IoMdArrowRoundBack></IoMdArrowRoundBack></Text>
                    </Text>
                 </Box>
            </Container>
        )
    }
}