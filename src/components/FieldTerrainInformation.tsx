import { Text, VStack } from "@chakra-ui/react";
import { getFieldTypeDesc } from "../machine_strike/model/FieldType";
import Tile from "../machine_strike/model/Tile";

interface IFieldTerrainInformation {
    tile: Tile;
}

export default function FieldTerrainInformation({tile}:IFieldTerrainInformation) {
    return (
        <>
            <VStack alignItems={'start'} gap={0} bgColor={'whiteAlpha.200'} p={2} rounded={6} w={'100%'}>
                <Text fontSize={'md'} fontWeight={'bold'}>Terreno: {getFieldTypeDesc(tile.type)}</Text>
                <Text fontSize={'sm'}>Impacto: {tile.type}</Text>
            </VStack>
        </>
    )
}