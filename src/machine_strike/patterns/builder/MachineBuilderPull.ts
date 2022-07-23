import MachinePull from "../../model/MachinePull";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderPull extends MachineBuilder {
    public reset(): void {
        this.machine = new MachinePull();
    }

    public setSkills(): void {
    }

    public setImage(): void {
        if (this.machine) {
            this.machine.image = "machine_pull.png";
        }
    }
}

export default MachineBuilderPull;