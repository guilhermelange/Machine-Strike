import DataReaderBoard from "../dao/DataReaderBoard";
import DataReaderMachine from "../dao/DataReaderMachine";
import DataFactory from "../DataFactory";
import MachineXml from "./MachineXml";
import BoardXml from "./BoardXml";
import DataReaderInventory from "../dao/DataReaderInventory";

class DataFactoryXml extends DataFactory {
    public readerInventory(): DataReaderInventory {
        throw new Error("Method not implemented.");
    }
    
    public readerBoard(): DataReaderBoard {
        return new BoardXml();
    }
    
    public readerMachine(): DataReaderMachine {
        return new MachineXml();
    }
}

export default DataFactoryXml