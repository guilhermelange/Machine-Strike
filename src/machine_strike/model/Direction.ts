import { Side } from "./Machine";

enum Direction {
    NORTH, SOUTH, EAST, WEST
}

export function getDirectionDesc(direction: Direction): string {
    switch (direction) {
        case Direction.NORTH:
            return 'Norte'
        case Direction.SOUTH:
            return 'Sul'
        case Direction.EAST:
            return 'Leste'
        case Direction.WEST:
            return 'Oeste'
    }
}

export function nextDirection(direction: Direction): Direction {
    switch (direction) {
        case Direction.NORTH:
            return Direction.EAST;

        case Direction.EAST:
            return Direction.SOUTH;

        case Direction.SOUTH:
            return Direction.WEST;

        case Direction.WEST:
            return Direction.NORTH;
    }
}

export function getSidesFromDirection(direction: Direction, sides: Map<Direction, Side>): Map<Direction, Side> {
    const refatoredMap = new Map<Direction, Side>()
    switch (direction) {
        case Direction.NORTH:
            refatoredMap.set(Direction.NORTH, sides.get(Direction.NORTH) as Side)
            refatoredMap.set(Direction.SOUTH, sides.get(Direction.SOUTH) as Side)
            refatoredMap.set(Direction.WEST, sides.get(Direction.WEST) as Side)
            refatoredMap.set(Direction.EAST, sides.get(Direction.EAST) as Side)
            break;

        case Direction.SOUTH:
            refatoredMap.set(Direction.NORTH, sides.get(Direction.SOUTH) as Side)
            refatoredMap.set(Direction.SOUTH, sides.get(Direction.NORTH) as Side)
            refatoredMap.set(Direction.WEST, sides.get(Direction.EAST) as Side)
            refatoredMap.set(Direction.EAST, sides.get(Direction.WEST) as Side)
            break;

        case Direction.WEST:
            refatoredMap.set(Direction.NORTH, sides.get(Direction.WEST) as Side)
            refatoredMap.set(Direction.SOUTH, sides.get(Direction.EAST) as Side)
            refatoredMap.set(Direction.WEST, sides.get(Direction.SOUTH) as Side)
            refatoredMap.set(Direction.EAST, sides.get(Direction.NORTH) as Side)
            break;

        case Direction.EAST:
            refatoredMap.set(Direction.NORTH, sides.get(Direction.EAST) as Side)
            refatoredMap.set(Direction.SOUTH, sides.get(Direction.WEST) as Side)
            refatoredMap.set(Direction.WEST, sides.get(Direction.NORTH) as Side)
            refatoredMap.set(Direction.EAST, sides.get(Direction.SOUTH) as Side)
            break;
    }
    return refatoredMap
}

export default Direction