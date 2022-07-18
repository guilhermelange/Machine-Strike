import Settings from "../../../global/Settings";
import JsonToJs from "../../adapter/JsonToJs";
import { loadMachinesJs, MachineFormat } from "../../builder/Utils";
import DataReaderMachine from "../dao/DataReaderMachine";


class MachineJson extends DataReaderMachine {
    public async read(file: File): Promise<void> {
        const settings = Settings.getInstance()
        const content = await file.text()
        const converter = new JsonToJs()
        const machinesJs = converter.convert(content) as MachineFormat[]

        const machines = loadMachinesJs(machinesJs);
        settings.machines = machines;
    }
}



export default MachineJson