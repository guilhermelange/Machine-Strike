import Machine from "../../model/Machine";
import DataReaderBoard from "./dao/DataReaderBoard";
import DataReaderInventory from "./dao/DataReaderInventory";
import DataReaderMachine from "./dao/DataReaderMachine";

abstract class DataFactory {
    public abstract readerMachine(): DataReaderMachine
    public abstract readerBoard(): DataReaderBoard
    public abstract readerInventory(): DataReaderInventory
}

export default DataFactory