import MachineSwoop from "../../model/MachineSwoop";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderSwoop extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineSwoop();
    }

    public setSkills(): void {
    }
}

export default MachineBuilderSwoop;