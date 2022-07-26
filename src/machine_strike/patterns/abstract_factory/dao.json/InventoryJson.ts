import Settings from "../../../global/Settings";
import Direction from "../../../model/Direction";
import Machine from "../../../model/Machine";
import Player from "../../../model/Player";
import JsonToJs from "../../adapter/JsonToJs";
import MachineStartState from "../../state/MachineStartState";
import DataReaderInventory from "../dao/DataReaderInventory";

interface IRoot {
    Player1: IInventaryJson[];
    Player2: IInventaryJson[]
}

interface IInventaryJson {
    machine: string;
    positions: IPosition;
}

interface IPosition extends Array<Array<number>> {}

class InventoryJson extends DataReaderInventory {
    public async read(file: File): Promise<void> {
        const settings = Settings.getInstance()
        const content = await file.text()
        const converter = new JsonToJs()
        const inventoryJs = converter.convert(content) as IRoot
        
        const player1Machines = loadInventoryJs(inventoryJs.Player1, Direction.NORTH, Player.Player1);
        const player2Machines = loadInventoryJs(inventoryJs.Player2, Direction.SOUTH, Player.Player2);
        const map = new Map<Player, Machine[]>();
        map.set(Player.Player1, player1Machines)
        map.set(Player.Player2, player2Machines)

        settings.player_machines = map
    }
}

function loadInventoryJs(data: IInventaryJson[], defaultDirection: Direction, player: Player): Machine[] {
    const settings = Settings.getInstance()
    const board = settings.board
    
    const machineArray = [] as Machine[]
    for (let i = 0; i < data.length; i++) {
        const machineInventory = data[i];
        const settingsMachine = settings.machines.get(machineInventory.machine);

        for (let j = 0; j < machineInventory.positions.length; j++) {
            const position = machineInventory.positions[j];
            const [x, y] = position
            const machine = settingsMachine?.clone() as Machine;
            machine.direction = defaultDirection;
            machine.player = player;
            machine.state = new MachineStartState(machine);
            
            board.tiles[x][y].machine = machine;
            machineArray.push(machine) // Precisa?
        }
    }

    return machineArray;
}



export default InventoryJson