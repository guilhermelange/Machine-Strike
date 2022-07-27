import Settings from "../global/Settings";
import MachineStartState from "../patterns/state/MachineStartState";
import MachineState from "../patterns/state/MachineStats";
import Direction, { nextDirection } from "./Direction";
import Player from "./Player";
import Point from "./Point";
import Tile from "./Tile";

interface ConstructorOf<T> {
    new(): T;
}
abstract class Machine {
    private _name: string;
    private _attackPower: number;
    private _attackDistance: number;
    private _moveDistance: number;
    private _health: number;
    private _victoryPoints: number;
    private _sides: Map<Direction, Side>;
    private _image: string;
    private _direction: Direction;
    private _player: Player;
    private _state: MachineState;

    constructor(...args: any[]) {
        this._name = '';
        this._attackPower = 0;
        this._attackDistance = 0;
        this._moveDistance = 0;
        this._health = 0;
        this._victoryPoints = 0;
        this._sides = new Map<Direction, Side>();
        this._image = "";
        this._direction = Direction.NORTH;
        this._player = Player.Player1;
        this._state = new MachineStartState(this);
    }

    get cls(): ConstructorOf<this> {
        return this.constructor as any;
    }

    get name(): string {
        return this._name;
    }

    get attackPower(): number {
        return this._attackPower;
    }

    get attackDistance(): number {
        return this._attackDistance;
    }

    get moveDistance(): number {
        return this._moveDistance;
    }

    get health(): number {
        return this._health;
    }

    get victoryPoints(): number {
        return this._victoryPoints;
    }

    get sides(): Map<Direction, Side> {
        return this._sides;
    }

    get image(): string {
        return this._image;
    }

    get player(): Player {
        return this._player;
    }

    get direction(): Direction {
        return this._direction;
    }

    get state(): MachineState {
        return this._state;
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
        this._victoryPoints = victoryPoints;
    }

    set sides(sides: Map<Direction, Side>) {
        this._sides = sides;
    }

    set image(image: string) {
        this._image = image;
    }

    set direction(direction: Direction) {
        this._direction = direction;
    }

    set player(player: Player) {
        this._player = player;
    }

    set state(state: MachineState) {
        this._state = state;
    }

    abstract description(): string;

    getCombatPower(tile: Tile, attackDirection: Direction | null = null): number {
        const settings = Settings.getInstance()
        const roundPlayer = settings.player
        let combatPower = +tile.type
        
        if (this._player != roundPlayer)  {
            // defesa
        } else {
            combatPower += +this.attackPower;
        }
        return combatPower
    }

    changeDirection() {
        this._direction = nextDirection(this._direction)
    }

    clone(): Machine {
        const cloneObject = new this.cls;
        for (const attribut in this) {
            if(!(typeof this[attribut] === "object")){
                cloneObject[attribut] = this[attribut];
            }
        }
        cloneObject._sides = this._sides;
        cloneObject._direction = this._direction;
        cloneObject._player = this._player;
        cloneObject._state = this._state;

        return cloneObject;
    }

    // State Begin
    canAttack(machinePoint: Point, tiles: Tile[][]) {
        return this.state.canAttack(machinePoint, tiles).length > 0;
    }

   
    attack(machinePoint: Point, tiles: Tile[][]) {
        this.state.attack(machinePoint, tiles);
    }

    move(machinePoint: Point, pointDestine: Point, tiles: Tile[][]) {
        this.state.move(machinePoint, pointDestine, tiles);
    }

    overload() {
        this.state.overload();
    }
    // State End

    toString(): string {
        return this.cls.name;
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
        case "WEAK":
            return Side.WEAK;
        default:
            return Side.DEFAULT;
    }
}

export default Machine