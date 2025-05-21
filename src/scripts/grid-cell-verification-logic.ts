// boardsize.ts에 정의된 boardSize 사용
import { boardSize } from "./boardsize";

// 수정된 tilesSearch: 모든 셀을 다 반환 (0도 포함)
export function tilesSearch(board: number[][]) {
    const tileArr: { row: number; col: number; value: number }[] = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            tileArr.push({ row, col, value: board[row][col] });
        }
    }
    return tileArr;
}
