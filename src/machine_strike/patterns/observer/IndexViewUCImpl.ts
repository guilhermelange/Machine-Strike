import Settings from "../../global/Settings";
import DataFactoryJson from "../abstract_factory/dao.json/DataFactoryJson";
import DataFactoryXml from "../abstract_factory/dao.xml/DataFactoryXml";
import DataReaderBoard from "../abstract_factory/dao/DataReaderBoard";
import DataReaderMachine from "../abstract_factory/dao/DataReaderMachine";
import IndexViewObserver from "./IndexViewObserver";
import IndexViewUC from "./IndexViewUC";

class IndexViewUCImpl implements IndexViewUC {
    private obs: IndexViewObserver[];
    constructor() {
        this.obs = []
    }

    async startGame(data: any): Promise<void> {
        const settings = Settings.getInstance()
        const { machines, board } = data;

        const machinesFile: File = machines[0];
        const boardFile: File = board[0];

        settings.machines_file = machinesFile.name
        settings.board_file = boardFile.name

        await this.readMachineFile(machinesFile)
        await this.readBoardFile(boardFile)

        for (let index = 0; index < this.obs.length; index++) {
            const item: IndexViewObserver = this.obs[index];
            item.play();
        }
    }

    private async readMachineFile(file: File) {
        const fileType = file.type
        
        let MachineReader = null
        if (fileType.includes('xml')) {
            const factory = new DataFactoryXml();
            MachineReader = factory.readerMachine() as DataReaderMachine
        } else {
            const factory = new DataFactoryJson();
            MachineReader = factory.readerMachine() as DataReaderMachine
        }
        await MachineReader.read(file)
    }

    private async readBoardFile(file: File) {
        const fileType = file.type

        let BoardReader = null
        if (fileType.includes('xml')) {
            const factory = new DataFactoryXml();
            BoardReader = factory.readerBoard() as DataReaderBoard
        } else {
            const factory = new DataFactoryJson();
            BoardReader = factory.readerBoard() as DataReaderBoard
        }
        await BoardReader.read(file)
    }

    addObserver(observer: IndexViewObserver): void {
        this.obs.push(observer);
    }

    removeObserver(observer: IndexViewObserver): void {
        this.obs = this.obs.filter(item => item != observer)
    }
}

export default IndexViewUCImpl;