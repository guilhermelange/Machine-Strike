import MachineDash from "../../model/MachineDash";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderDash extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineDash();
    }

    public setSkills(): void {
    }
}

export default MachineBuilderDash;