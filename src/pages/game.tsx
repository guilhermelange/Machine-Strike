import { Box, Container, Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Router from "next/router";
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function Game() {
    const formBackground = useColorModeValue('gray.100', 'gray.700')
    const tiles: string[][] = []
    for (let i = 0; i < 8; i++) {
        let line = []
        for (let j = 0; j < 8; j++) {
            line.push(i + "" + j)
        }
        tiles.push(line)
    }

    const handleRedirectStart = async () => {
        Router.push('/')
    }

    return (
        <Container maxW={'8xl'} h={'100vh'} py={10}>
            <Grid templateAreas={`"board machine"
                                  "board command"`}
                gridTemplateRows={'3fr 2fr'}
                gridTemplateColumns={'3fr 1fr'}
                gap={2}
                rounded={6}
                h={'100%'}
                w={'100%'}
            >
                <GridItem area={'board'} bg={formBackground} rounded={6} p={3}>
                    <Grid h={'100%'}
                        w={'100%'}
                        templateRows='repeat(8, 1fr)'
                        templateColumns='repeat(8, 1fr)'
                        gap={0.5}>
                        {tiles && tiles.map(tile => tile.map(field => (
                            <Box key={field}
                                bg={'whiteAlpha.200'}
                                rounded={1}
                                >{field}</Box>
                        )))}

                    </Grid>
                </GridItem>
                <GridItem area={'machine'} bg={formBackground} rounded={6} p={3}>
                    Máquina
                </GridItem>
                <GridItem area={'command'} bg={formBackground} rounded={6} p={3}>
                    Comandos
                </GridItem>
            </Grid>
            <Flex position={'absolute'} top={3} w={''} alignItems={'flex-end'} cursor={'pointer'} onClick={handleRedirectStart}>
                <IoMdArrowRoundBack></IoMdArrowRoundBack>
            </Flex>
        </Container>
    )
}