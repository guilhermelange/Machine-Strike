import DataReaderBoard from "../dao/DataReaderBoard";
import DataReaderMachine from "../dao/DataReaderMachine";
import DataFactory from "../DataFactory";
import MachineJson from "./MachineJson";
import BoardJson from "./BoardJson";
import InventoryJson from "./InventoryJson";
import DataReaderInventory from "../dao/DataReaderInventory";

class DataFactoryJson extends DataFactory {
    public readerInventory(): DataReaderInventory {
        return new InventoryJson();
    }

    public readerBoard(): DataReaderBoard {
        return new BoardJson();
    }
    
    public readerMachine(): DataReaderMachine {
        return new MachineJson();
    }
}

export default DataFactoryJson