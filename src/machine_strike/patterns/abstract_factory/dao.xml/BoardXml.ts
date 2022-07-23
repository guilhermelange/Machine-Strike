import XmlToJs from "../../adapter/XmlToJs";
import Settings from "../../../global/Settings";
import DataReaderBoard from "../dao/DataReaderBoard";
import Tile from "../../../model/Tile";
import Board from "../../../model/Board";
import { getFieldType } from "../../../model/FieldType";

interface IRoot {
    root: {
        row: [{item: string[]}]
    }
}

class BoardXml extends DataReaderBoard {
    public async read(file: File): Promise<void> {
        const settings = Settings.getInstance()
        const content = await file.text()
        const xmlConverter = new XmlToJs();
        const boardXml = xmlConverter.convert(content) as IRoot

        loadBoardJs(boardXml.root.row)
        const board = loadBoardJs(boardXml.root.row);
        settings.board = board;
    }
}

function loadBoardJs(fields: [{item: string[]}]) {
    const tiles = []
    for (let i = 0; i < fields.length; i++) {
        const tileLine = [] as Tile[]
        for (let j = 0; j < fields[i].item.length; j++) {
            const currentFieldType = getFieldType(fields[i].item[j])
            const tile = new Tile(null, currentFieldType)
            tileLine.push(tile)
        }
        tiles.push(tileLine)
    }

    const board = new Board(tiles);
    return board
}


export default BoardXml