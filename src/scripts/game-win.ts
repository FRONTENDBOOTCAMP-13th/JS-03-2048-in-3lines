import { boardSize } from "./boardsize";
import { grid } from "./add-random-cell";
import { handleMove, backupGridState } from "./game-start";
import { resetScore } from "./score";

// 2048 생성 시 game win 이미지 표시
export function checkWin(): void {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (grid[row][col] === 2048) {
                showGameStartImage();
                document.removeEventListener("keydown", handleMoveWrapper);
                return;
            }
        }
    }
}

// 이미지 띄우기
function showGameStartImage() {
    const winEl = document.getElementById("game-win");
    if (winEl) {
        winEl.style.display = "flex";
        resetScore();
        backupGridState();
    }
}

// 키 입력 처리 함수 (main.ts에서 키 이벤트 등록용)
export function handleMoveWrapper(event: KeyboardEvent) {
    const keyToDirection: { [key: string]: "up" | "down" | "left" | "right" } = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
    };
    const direction = keyToDirection[event.key];
    if (direction) {
        handleMove(direction);
    }
}
