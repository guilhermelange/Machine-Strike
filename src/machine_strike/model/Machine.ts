import Direction from "./Direction";

class Machine {
    private _name: string;
    private _attackPower: number;
    private _attackDistance: number;
    private _moveDistance: number;
    private _health: number;
    private _victoryPoints: number;
    private  _sides: Map<Direction, Side>;

    constructor(...args: any[]) {
        this._name = '';
        this._attackPower = 0;
        this._attackDistance = 0;
        this._moveDistance = 0;
        this._health = 0;
        this._victoryPoints = 0;
        this._sides = new Map<Direction, Side>()
    }    


    get name(): string {
        return this._name
    }

    get attackPower(): number {
        return this._attackPower
    }

    get attackDistance(): number {
        return this._attackDistance
    }

    get moveDistance(): number {
        return this._moveDistance
    }

    get health(): number {
        return this._health
    }

    get victoryPoints(): number {
        return this._victoryPoints
    }

    get sides(): Map<Direction, Side> {
        return this._sides;
    }

    set name(name: string) {
        this._name = name;
    }

    set attackPower(attackPower: number) {
        this._attackPower = attackPower;
    }

    set attackDistance(attackDistance: number) {
        this._attackDistance = attackDistance;
    }

    set moveDistance(moveDistance: number) {
        this._moveDistance = moveDistance;
    }

    set health(health: number) {
        this._health = health;
    }

    set victoryPoints(victoryPoints: number) {
        this._victoryPoints = victoryPoints
    }

    set sides(sides: Map<Direction, Side>) {
        this._sides = sides
    }
}

export enum Side {
    ARMORED = 1,
    WEAK = -1,
    DEFAULT = 0
}

export function getSideEnum(enumName: string): Side {
    switch (enumName) {
        case "ARMORED":
            return Side.ARMORED;
            break;
        case "WEAK":
            return Side.WEAK;
            break;
        default:
            return Side.DEFAULT;
            break;
    }
}

export default Machine
