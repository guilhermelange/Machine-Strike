import { Box } from "@chakra-ui/react";

type Props = {
    height: number,
    children?: React.ReactNode,
    image?: string;
};

function TileComponent({ height, children, image}: Props) {
    return (
        <Box
            position={'relative'}
            bg={'whiteAlpha.200'}
            h={height / 8 - (0.5  * 7)}
            w={height / 8 - (0.5  * 7)}
            backgroundImage={`url("terrain/${image}")`}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'100% 100%'}
        >{children}</Box>
    )
}

export default TileComponent