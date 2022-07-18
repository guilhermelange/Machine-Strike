import MachineRam from "../../model/MachineRam";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderRam extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineRam();
    }

    public setSkills(): void {
    }
}

export default MachineBuilderRam;