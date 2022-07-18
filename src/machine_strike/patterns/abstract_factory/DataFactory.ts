import Machine from "../../model/Machine";
import DataReaderMachine from "./dao/DataReaderMachine";

abstract class DataFactory {
    public abstract readerMachine(): DataReaderMachine
}

export default DataFactory