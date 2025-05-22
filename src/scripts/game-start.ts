import {
    createEmptyGrid,
    setGrid,
    grid,
    addRandomCell,
    addRandomXCell,
    addRandomCell2,
} from "./add-random-cell";
import { mergeTiles } from "./marge-tiles";
import { updateBoard, updateBoard2 } from "./board";
import { findMovetile, moveAniElement } from "./find-move-tile";
import { boardSize } from "./boardsize";
import { handleMoveWrapper } from "./game-win";
import { canMoveOrMerge } from "./can-move";
import { checkGameOver, isGameOver } from "./game-over";
import { StartCheck } from "../main";

let inputDelay = false;
let previousGridState: number[][] = [];

// 공통 초기화 설정
function resetGameUI() {
    const winEl = document.getElementById("game-win");
    if (winEl) winEl.style.display = "none";

    const gameOverEl = document.getElementById("game-over");
    if (gameOverEl) gameOverEl.style.display = "none";

    const gameOver1pEl = document.getElementById("game-over-1p");
    if (gameOver1pEl) gameOver1pEl.style.display = "none";

    const gameOver2pEl = document.getElementById("game-over-2p");
    if (gameOver2pEl) gameOver2pEl.style.display = "none";

    document.addEventListener("keydown", handleMoveWrapper);
}

// 일반 난이도
export function initGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true);
    addRandomCell(true);
    updateBoard();
    resetGameUI();
}
export function timeAttackInitGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true); // 초기 셀 1
    addRandomCell(true); // 초기 셀 2
    updateBoard();
    resetGameUI();
}

// AI 전용 보드 초기화
export function aiinitGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true);
    addRandomCell(true);
    addRandomCell2(true);
    addRandomCell2(true);
    updateBoard();
    updateBoard2();
    resetGameUI();
}

// 하드 모드
export function HardinitGrid(): void {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    addRandomCell(true);
    addRandomCell(true);
    addRandomXCell(true); // 이동 불가 셀 추가
    updateBoard();
    resetGameUI();
}

// 현재 상태 백업
export function backupGridState() {
    previousGridState = grid.map(row => [...row]);
}

// 백업 상태 복구
export function restorePreviousState() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            grid[i][j] = previousGridState[i][j];
        }
    }
    updateBoard();
}

// 방향 이동 처리
export function handleMove(direction: "up" | "down" | "left" | "right"): void {
    if (inputDelay) return;
    if (isGameOver) return;
    backupGridState();
    findMovetile(direction, false);
    inputDelay = true;
    StartCheck(false);

    setTimeout(() => {
        inputDelay = false;
    }, 310);

    const boardElement = document.getElementById("board");
    const div = boardElement?.querySelector(".box");

    if (!boardElement || !div) return;

    moveAniElement(
        direction,
        parseFloat(getComputedStyle(div).width) + parseFloat(getComputedStyle(boardElement).gap),
        false,
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
    }, 300);
}
