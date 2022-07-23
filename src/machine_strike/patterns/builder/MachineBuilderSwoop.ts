import MachineSwoop from "../../model/MachineSwoop";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderSwoop extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineSwoop();
    }

    public setSkills(): void {
    }

    public setImage(): void {
        if (this.machine) {
            this.machine.image = "machine_swoop.png";
        }
    }
}

export default MachineBuilderSwoop;