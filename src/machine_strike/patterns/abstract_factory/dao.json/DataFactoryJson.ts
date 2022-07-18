import DataReaderMachine from "../dao/DataReaderMachine";
import DataFactory from "../DataFactory";
import MachineJson from "./MachineJson";

class DataFactoryJson extends DataFactory {
    public readerMachine(): DataReaderMachine {
        return new MachineJson();
    }
}

export default DataFactoryJson