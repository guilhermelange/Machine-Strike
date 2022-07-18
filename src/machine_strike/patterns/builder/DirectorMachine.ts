import MachineBuilder, { IAttributes, IAttributesTemplate } from "./MachineBuilder"

class DirectorMachine {
    private _builder: MachineBuilder | undefined

    constructor(...args: any[]) {
        if (args.length > 0) {
            this._builder = args[0] as MachineBuilder
        }
    }

    set builder(builder: MachineBuilder) {
        this._builder = builder;
    }

    public build(data: IAttributesTemplate) {
        const {attackDistance, attackPower, health, moveDistance, name, victoryPoints} = data
        const attributes = {attackDistance, attackPower, health, moveDistance, name, victoryPoints} as IAttributes
        const sides = data.sides

        if (this._builder) {
            this._builder.reset();
            this._builder.setAttributes(attributes);
            this._builder.setSides(sides);
            this._builder.setSkills();
        }
    }

}

export default DirectorMachine