import { boardSize } from "./boardsize";
import { grid } from "./add-random-cell";
import { resetScore } from "./score";
import { backupGridState } from "./game-start";

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
function showGameOverImage(): void {
    const gameOverEl = document.getElementById("game-over");
    resetScore();
    backupGridState();
    if (gameOverEl) {
        gameOverEl.style.display = "flex";
    }
}
