import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";

export function tilesSearch() {
    const tileArr: { row: number; col: number; value: number }[] = [];
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize; row++) {
            if (grid[row][col] !== 0) {
                tileArr.push({ row, col, value: grid[row][col] });
            }
        }
    }
    return tileArr;
}
