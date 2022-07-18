import DataReaderMachine from "../dao/DataReaderMachine";
import DataFactory from "../DataFactory";
import MachineXml from "./MachineXml";

class DataFactoryXml extends DataFactory {
    public readerMachine(): DataReaderMachine {
        return new MachineXml();
    }
}

export default DataFactoryXml