import Direction from "../../model/Direction";
import Machine, { getSideEnum, Side } from "../../model/Machine";
import DirectorMachine from "./DirectorMachine";
import MachineBuilder, { IAttributesTemplate } from "./MachineBuilder";
import MachineBuilderDash from "./MachineBuilderDash";
import MachineBuilderGunner from "./MachineBuilderGunner";
import MachineBuilderMelee from "./MachineBuilderMelee";
import MachineBuilderPull from "./MachineBuilderPull";
import MachineBuilderRam from "./MachineBuilderRam";
import MachineBuilderSwoop from "./MachineBuilderSwoop";

export function getBuilders(): Map<string, MachineBuilder> {
    const machineBuilders = new Map<string, MachineBuilder>();
    machineBuilders.set("MELEE", new MachineBuilderMelee())
    machineBuilders.set("GUNNER", new MachineBuilderGunner())
    machineBuilders.set("RAM", new MachineBuilderRam())
    machineBuilders.set("DASH", new MachineBuilderDash())
    machineBuilders.set("SWOOP", new MachineBuilderSwoop())
    machineBuilders.set("PULL", new MachineBuilderPull())

    return machineBuilders;
}

export interface MachineFormat {
    type: string;
    name: string;
    attackPower: number;
    attackDistance: number;
    moveDistance: number;
    victoryPoints: number;
    health: number;
    sides: MachineFormatSides;
}

export interface MachineFormatSides {
    NORTH: string;
    SOUTH: string;
    WEST: string;
    EAST: string;
}

export function loadMachinesJs(machinesJs: MachineFormat[]): Map<String, Machine> {
    const machines = new Map<String, Machine>();
    const machineBuilders = getBuilders();
    const directorMachine = new DirectorMachine();

    for (let i = 0; i < machinesJs.length; i++) {
        const machineData = machinesJs[i];
        const machineBuilder = machineBuilders.get(machineData.type) as MachineBuilder;
        
        // Attributes
        const attackDistance = machineData.attackDistance
        const attackPower = machineData.attackPower
        const health = machineData.health
        const moveDistance = machineData.moveDistance
        const name = machineData.name
        const victoryPoints = machineData.victoryPoints

        // Sides
        const sides = new Map<Direction, Side>()
        sides.set(Direction.NORTH, getSideEnum(machineData.sides.NORTH))
        sides.set(Direction.SOUTH, getSideEnum(machineData.sides.SOUTH))
        sides.set(Direction.WEST, getSideEnum(machineData.sides.WEST))
        sides.set(Direction.EAST, getSideEnum(machineData.sides.EAST))

        const attributes = { attackDistance, attackPower, health, moveDistance, name, victoryPoints, sides } as IAttributesTemplate

        directorMachine.builder = machineBuilder
        directorMachine.build(attributes)
        const machine = machineBuilder.getResult() as Machine
        machines.set(name, machine);
    }

    return machines;
}