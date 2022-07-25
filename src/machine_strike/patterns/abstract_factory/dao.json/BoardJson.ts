import Settings from "../../../global/Settings";
import Board from "../../../model/Board";
import FieldType, { getFieldType } from "../../../model/FieldType";
import Point from "../../../model/Point";
import Tile from "../../../model/Tile";
import JsonToJs from "../../adapter/JsonToJs";
import DataReaderBoard from "../dao/DataReaderBoard";

interface IBoardFieldType extends Array<string> {}

class BoardJson extends DataReaderBoard {
    public async read(file: File): Promise<void> {
        const settings = Settings.getInstance()
        const content = await file.text()
        const converter = new JsonToJs()
        const boardJs = converter.convert(content) as IBoardFieldType[]
        const board = loadBoardJs(boardJs);

        settings.board = board
    }
}

function loadBoardJs(fields: IBoardFieldType[]) {
    const tiles = []
    for (let i = 0; i < fields.length; i++) {
        const tileLine = [] as Tile[]
        for (let j = 0; j < fields[i].length; j++) {
            const currentFieldType = getFieldType(fields[i][j])
            const tile = new Tile(null, currentFieldType, new Point(i, j))
            tileLine.push(tile)
        }
        tiles.push(tileLine)
    }

    const board = new Board(tiles);
    return board
}



export default BoardJson