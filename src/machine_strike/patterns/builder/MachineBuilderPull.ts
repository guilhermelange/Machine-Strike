import MachinePull from "../../model/MachinePull";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderPull extends MachineBuilder {
    public reset(): void {
        this.machine = new MachinePull();
    }

    public setSkills(): void {
    }
}

export default MachineBuilderPull;