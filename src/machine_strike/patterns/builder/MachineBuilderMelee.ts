import MachineMelee from "../../model/MachineMelee";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderMelee extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineMelee();
    }

    public setSkills(): void {
    }
}

export default MachineBuilderMelee;