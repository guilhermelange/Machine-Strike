import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import TileDecorator from "./TileDecorator";

class TileCursor extends TileDecorator {
    draw(height: number, children: ReactNode): ReactNode {
        return (
            <>
                {super.draw(height, 
                    <>{children}<Box position={'absolute'} 
                    w={'100%'} 
                    h={'100%'} 
                    top={0}
                    border={'2px solid blue'}
                    rounded={4}
                    borderColor={"teal.100"}
                    >
            </Box></>)}
            </>
        )
    }
}

export default TileCursor