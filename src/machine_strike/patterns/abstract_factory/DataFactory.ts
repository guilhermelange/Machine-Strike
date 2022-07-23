import Machine from "../../model/Machine";
import DataReaderBoard from "./dao/DataReaderBoard";
import DataReaderMachine from "./dao/DataReaderMachine";

abstract class DataFactory {
    public abstract readerMachine(): DataReaderMachine
    public abstract readerBoard(): DataReaderBoard
}

export default DataFactory