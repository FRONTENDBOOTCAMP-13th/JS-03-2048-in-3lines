import { createEmptyGrid, setGrid, grid, addRandomCell } from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard } from "./board";
import { findMovetile, AniElement, moveAniElement } from "./find-move-tile";
import { tilesSearch } from "./grid-cell-verification-logic";
import { boardSize } from "./boardsize";
import { handleMoveWrapper } from "./game-win";

let inputDelay = false;

export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();
    //테스트 용
    tilesSearch();

    // 게임 승리 이미지 숨기기
    const winEl = document.getElementById("game-win");
    if (winEl) {
        winEl.style.display = "none";
    }

    // 키 입력 이벤트 다시 등록
    document.addEventListener("keydown", handleMoveWrapper);
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
