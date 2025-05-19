import { createEmptyGrid, setGrid, grid, addRandomCell } from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard } from "./board";
import { findMovetile, AniElement, moveAniElement } from "./find-move-tile";
import { tilesSearch } from "./grid-cell-verification-logic";
import { boardSize } from "./boardsize";

let inputDelay = false;
let previousGridState: number[][] = [];

export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();
    //테스트 용
    tilesSearch();
}
export function backupGridState() {
    // 현재 보드의 상태를 깊은 복사로 저장
    previousGridState = grid.map(row => [...row]);
}
export function restorePreviousState() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            grid[i][j] = previousGridState[i][j];
        }
    }
    updateBoard(); // 반드시 호출해야 보드가 다시 그림
}

// 이전 상태와 비교하여 변경되었을 때만 처리
export function handleMove(direction: "up" | "down" | "left" | "right"): void {
    if (inputDelay) return;
    backupGridState(); // 이동 전에 상태 저장
    findMovetile(direction);
    inputDelay = true;

    setTimeout(() => {
        inputDelay = false;
    }, 600);

    // ✅ 이동값 동적으로 계산
    const boardElement = document.getElementById("board");
    if (!boardElement) return;

    const tileSize = boardElement.clientWidth / boardSize; // ← 핵심 수정
    moveAniElement(direction, tileSize);

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
