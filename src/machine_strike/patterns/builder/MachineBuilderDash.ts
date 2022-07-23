import MachineDash from "../../model/MachineDash";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderDash extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineDash();
    }

    public setSkills(): void {
    }

    public setImage(): void {
        if (this.machine) {
            this.machine.image = "machine_dash.png";
        }
    }
}

export default MachineBuilderDash;