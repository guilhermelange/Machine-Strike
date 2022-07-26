import { Text, VStack } from "@chakra-ui/react";
import { getDirectionDesc } from "../machine_strike/model/Direction";
import Machine, { Side } from "../machine_strike/model/Machine";
import Player, { getPlayerDesc } from "../machine_strike/model/Player";

interface IMachineInformation {
    machine: Machine;
}

export default function MachineInformation({machine} : IMachineInformation) {
    let armoredSides = "";
    let weakSides = "";
    machine.sides.forEach((value, key) => {
        if (value == Side.ARMORED) {
            armoredSides += ((armoredSides == "") ? "" : ", ") + getDirectionDesc(key);
        }
        if (value == Side.WEAK) {
            weakSides += ((weakSides == "") ? "" : ", ") + getDirectionDesc(key);
        }
    })

    return (
        <>
            <VStack alignItems={'start'} gap={0} bgColor={'whiteAlpha.200'} p={2} rounded={6} w={'100%'}>
                <Text marginTop={'0 !important'} fontSize={'md'} fontWeight={'bold'}>Máquina: {machine.name}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Tipo: {machine.description()}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Ataque: {machine.attackPower}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Distância Ataque: {machine.attackDistance}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Vida: {machine.health}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Movimento: {machine.moveDistance}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Pontos de Vitória: {machine.victoryPoints}</Text>
                <Text marginTop={'0 !important'} fontSize={'sm'}>Proprietário: {getPlayerDesc(machine.player)}</Text>
                {armoredSides && (
                    <Text marginTop={'0 !important'} fontSize={'sm'}>Forte: {armoredSides}</Text>
                )}
                {weakSides && (
                    <Text marginTop={'0 !important'} fontSize={'sm'}>Fraco: {weakSides}</Text>
                )}
            </VStack>
        </>
    )
}