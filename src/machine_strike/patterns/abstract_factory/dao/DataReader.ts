abstract class DataReader {
    public abstract read(file: File): Promise<void>
}

export default DataReader