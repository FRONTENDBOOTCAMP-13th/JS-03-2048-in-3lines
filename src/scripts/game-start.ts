import { createEmptyGrid, setGrid, grid, addRandomCell, addRandomXCell } from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard } from "./board";
import { findMovetile, moveAniElement } from "./find-move-tile";
import { boardSize } from "./boardsize";
import { handleMoveWrapper } from "./game-win";
import { canMoveOrMerge } from "./can-move";
import { checkGameOver, isGameOver } from "./game-over";

let inputDelay = false;
let previousGridState: number[][] = [];

export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();

    // 게임 승리 이미지 숨기기
    const winEl = document.getElementById("game-win");
    if (winEl) {
        winEl.style.display = "none";
    }
    // 게임 오버 이미지 숨기기
    const gameOverEl = document.getElementById("game-over");
    if (gameOverEl) {
        gameOverEl.style.display = "none";
    }

    // 키 입력 이벤트 다시 등록
    document.addEventListener("keydown", handleMoveWrapper);
}

export function timeAttackInitGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();

    // 게임 승리 이미지 숨기기
    const winEl = document.getElementById("game-win");
    if (winEl) {
        winEl.style.display = "none";
    }
    // 게임 오버 이미지 숨기기
    const gameOverEl = document.getElementById("game-over");
    if (gameOverEl) {
        gameOverEl.style.display = "none";
    }

    // 키 입력 이벤트 다시 등록
    document.addEventListener("keydown", handleMoveWrapper);
}


export function HardinitGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    addRandomXCell(true); //이동 불가 셀
    updateBoard();
    
    // 게임 승리 이미지 숨기기
    const winEl = document.getElementById("game-win");
    if (winEl) {
        winEl.style.display = "none";
    }
    // 게임 오버 이미지 숨기기
    const gameOverEl = document.getElementById("game-over");
    if (gameOverEl) {
        gameOverEl.style.display = "none";
    }

    // 키 입력 이벤트 다시 등록
    document.addEventListener("keydown", handleMoveWrapper);
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
    if (isGameOver) return;
    backupGridState(); // 이동 전에 상태 저장
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

            if (!canMoveOrMerge()) {
                checkGameOver();
            }
        }
    }, 500);
}
