import MachineMelee from "../../model/MachineMelee";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderMelee extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineMelee();
    }

    public setSkills(): void {
    }

    public setImage(): void {
        if (this.machine) {
            this.machine.image = "machine_melee.png";
        }
    }
}

export default MachineBuilderMelee;