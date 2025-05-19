import { createEmptyGrid, setGrid, grid, addRandomCell } from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard } from "./board";
import { findMovetile, AniElement, moveAniElement } from "./find-move-tile";
import { tilesSearch } from "./grid-cell-verification-logic";
import { boardSize } from "./boardsize";

let inputDelay = false;

export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();
    //테스트 용
    tilesSearch();
}

// 이전 상태와 비교하여 변경되었을 때만 처리
export function handleMove(direction: "up" | "down" | "left" | "right"): void {
    if (inputDelay) return;
    findMovetile(direction);
    inputDelay = true;

    setTimeout(() => {
        inputDelay = false;
    }, 600);

    // ✅ 이동값 동적으로 계산
    const boardElement = document.getElementById("board");
    const div = boardElement?.querySelector(".box");

    if (!boardElement || !div) return;

    moveAniElement(
        direction,
        parseFloat(getComputedStyle(div).width) + parseFloat(getComputedStyle(boardElement).gap),
    );

    const oldGrid = JSON.stringify(grid);

    setTimeout(() => {
        mergeTiles(direction);
        const newGrid = JSON.stringify(grid);

        if (newGrid !== oldGrid) {
            addRandomCell();
            updateBoard();
        }
    }, 500);
}
