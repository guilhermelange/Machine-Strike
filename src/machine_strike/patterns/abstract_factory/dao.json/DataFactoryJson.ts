import DataReaderBoard from "../dao/DataReaderBoard";
import DataReaderMachine from "../dao/DataReaderMachine";
import DataFactory from "../DataFactory";
import MachineJson from "./MachineJson";
import BoardJson from "./BoardJson";

class DataFactoryJson extends DataFactory {
    public readerBoard(): DataReaderBoard {
        return new BoardJson();
    }
    
    public readerMachine(): DataReaderMachine {
        return new MachineJson();
    }
}

export default DataFactoryJson