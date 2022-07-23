import MachineRam from "../../model/MachineRam";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderRam extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineRam();
    }

    public setSkills(): void {
    }

    public setImage(): void {
        if (this.machine) {
            this.machine.image = "machine_ram.png";
        }
    }
}

export default MachineBuilderRam;