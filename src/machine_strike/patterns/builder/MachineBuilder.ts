import Direction from "../../model/Direction";
import Machine, { Side } from "../../model/Machine";

export interface IAttributes {
    name: string;
    attackPower: number;
    attackDistance: number;
    moveDistance: number;
    health: number;
    victoryPoints: number;
}

export interface IAttributesTemplate extends IAttributes {
    sides: Map<Direction, Side>;
}

abstract class MachineBuilder {
    protected machine: Machine | undefined;
    
    public abstract reset(): void;

    public setAttributes(data: IAttributes) {
        if (this.machine) {
            this.machine.attackDistance = data.attackDistance
            this.machine.attackPower = data.attackPower
            this.machine.health = data.health
            this.machine.moveDistance = data.moveDistance
            this.machine.name = data.name
            this.machine.victoryPoints = data.victoryPoints
        }
    }

    public setSides(sides: Map<Direction, Side>) {
        if (this.machine)
            this.machine.sides = sides;
    }

    public abstract setSkills(): void;

    public abstract setImage(): void;

    public getResult(): Machine | undefined {
        return this.machine;
    };
}

export default MachineBuilder