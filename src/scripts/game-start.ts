import { createEmptyGrid, setGrid, grid, addRandomCell } from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard } from "./board";

export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();
}

// 이전 상태와 비교하여 변경되었을 때만 처리
export function handleMove(direction: "up" | "down" | "left" | "right"): void {
    const oldGrid = JSON.stringify(grid);
    mergeTiles(direction);
    const newGrid = JSON.stringify(grid);

    if (newGrid !== oldGrid) {
        addRandomCell();
        updateBoard();
    }
}
