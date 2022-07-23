import MachineGunner from "../../model/MachineGunner";
import MachineBuilder from "./MachineBuilder";

class MachineBuilderGunner extends MachineBuilder {
    public reset(): void {
        this.machine = new MachineGunner();
    }

    public setSkills(): void {
    }

    public setImage(): void {
        if (this.machine) {
            this.machine.image = "machine_gunner.png";
        }
    }
}

export default MachineBuilderGunner;