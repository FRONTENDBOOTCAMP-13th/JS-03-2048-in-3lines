import { createEmptyGrid, setGrid, grid, addRandomCell } from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard } from "./board";
import { findMovetile, AniElement, moveAniElement } from "./find-move-tile";

let inputDelay = false;

export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();
}

// 이전 상태와 비교하여 변경되었을 때만 처리
export function handleMove(direction: "up" | "down" | "left" | "right"): void {
    // 방향키 입력 딜레이
    if (inputDelay) return;
    findMovetile(direction);
    inputDelay = true;

    setTimeout(() => {
        inputDelay = false;
    }, 600);

    // 이동 애니메이션 실행
    moveAniElement(direction, 162.5); // 방향 , 이동 값
    const oldGrid = JSON.stringify(grid);

    setTimeout(() => {
        mergeTiles(direction);
        const newGrid = JSON.stringify(grid);

        if (newGrid !== oldGrid) {
            addRandomCell();
            updateBoard();
            AniElement(direction);
        }
    }, 500);
}
