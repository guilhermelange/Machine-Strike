import DataReaderMachine from "../dao/DataReaderMachine";
import XmlToJs from "../../adapter/XmlToJs";
import { loadMachinesJs, MachineFormat } from "../../builder/Utils";
import Settings from "../../../global/Settings";

interface IRoot {
    root: {
        machine: MachineFormat[]
    }
}

class MachineXml extends DataReaderMachine {
    public async read(file: File): Promise<void> {
        const settings = Settings.getInstance()
        const content = await file.text()
        const xmlConverter = new XmlToJs();
        const machinesXml = xmlConverter.convert(content) as IRoot

        const machines = loadMachinesJs(machinesXml.root.machine);
        settings.machines = machines;
    }
}

export default MachineXml