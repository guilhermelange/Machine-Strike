import MachineGunner from "../../model/MachineGunner";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderGunner extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineGunner();
    }

    public setSkills(): void {
    }
}

export default MachineBuilderGunner;