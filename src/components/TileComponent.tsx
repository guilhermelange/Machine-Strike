import { Box } from "@chakra-ui/react";

type Props = {
    height: number,
    children?: React.ReactNode,
};

function TileComponent({ height, children }: Props) {
    return (
        <Box
            position={'relative'}
            bg={'whiteAlpha.200'}
            h={height / 8 - (0.5  * 7)}
            w={height / 8 - (0.5  * 7)}
        >{children}</Box>
    )
}

export default TileComponent