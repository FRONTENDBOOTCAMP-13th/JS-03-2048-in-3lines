import { boardSize } from "./boardsize";
import { grid, grid2 } from "./add-random-cell";
import { resetScore } from "./score";
import { backupGridState } from "./game-start";
import { isAIMode, isTimeAttackMode } from "../main";

export let isGameOver = false;
let timeAttackTimeoutId: number | null = null;

// 게임 오버 조건 확인 및 이미지 표시
export function checkGameOver(): void {
    const canContinue = canMoveOrMerge();
    if (!canContinue) {
        showGameOverImage();
    }
}

// 이동 또는 병합 가능한 타일이 있는지 확인
function canMoveOrMerge(): boolean {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const current = grid[row][col];
            if (current === 0) return true;

            // 오른쪽
            if (col < boardSize - 1 && grid[row][col + 1] === current) return true;

            // 아래쪽
            if (row < boardSize - 1 && grid[row + 1][col] === current) return true;
        }
    }
    return false;
}

// 이미지 띄우기
export function showGameOverImage(): void {
    const gameOver1pEl = document.getElementById("game-over-1p");
    const gameOverEl = document.getElementById("game-over");
    resetScore();
    backupGridState();
    if (isAIMode) {
        if (gameOver1pEl) {
            gameOver1pEl.style.display = "flex";
        }
    } else {
        if (gameOverEl) {
            gameOverEl.style.display = "flex";
        }
    }
}
export function showGameOver2pImage(): void {
    const gameOver2pEl = document.getElementById("game-over-2p");
    if (gameOver2pEl) {
        gameOver2pEl.style.display = "flex";
    }
}

// 게임 오버 조건 확인 및 이미지 표시
export function checkGameOver2(): void {
    const canContinue = canMoveOrMerge2();
    if (!canContinue) {
        showGameOver2pImage();
    }
}

// 이동 또는 병합 가능한 타일이 있는지 확인
function canMoveOrMerge2(): boolean {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const current = grid2[row][col];
            if (current === 0) return true;

            // 오른쪽
            if (col < boardSize - 1 && grid2[row][col + 1] === current) return true;

            // 아래쪽
            if (row < boardSize - 1 && grid2[row + 1][col] === current) return true;
        }
    }
    return false;
}
export function timeAttack(): void {
    console.log("타임어택 모드");
    cancelTimeAttack(); // 항상 기존 타이머 취소
    timeAttackTimeoutId = window.setTimeout(() => {
        const gameOverEl = document.getElementById("game-over");
        if (gameOverEl) gameOverEl.style.display = "flex";
        isGameOver = true;
        checkGameOver();
        timeAttackTimeoutId = null;
    }, 1000 * 60 * 2); 
}
export function cancelTimeAttack(): void {
    if (timeAttackTimeoutId !== null) {
        clearTimeout(timeAttackTimeoutId);
        timeAttackTimeoutId = null;
    }
}
export function resetGameOver() {
    const gameOverEl = document.getElementById("game-over");
    if (gameOverEl) {
        gameOverEl.style.display = "none";
    }
    isGameOver = false;
    resetScore();
    cancelTimeAttack();
}
