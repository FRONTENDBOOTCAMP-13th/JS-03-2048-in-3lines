import "./style.css";
import "./anime/animation.css";
import { setupBoard } from "./scripts/board";
import { setBoardSize } from "./scripts/boardsize";
import { initGrid, handleMove, restorePreviousState } from "./scripts/game-start";
import { playClickSound, stopBGM, playBGM, isBGMPlaying } from "./scripts/audio";
import { setupModal } from "./scripts/modal";
import { resetScore } from "./scripts/score";
setupModal();

type Direction = "up" | "down" | "left" | "right";

// 보드 UI 구성
setupBoard();

// 시작 버튼 이벤트
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    resetScore();
    initGrid();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
});

// 재시작 버튼 이벤트
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    playClickSound();
    resetScore();
    initGrid();
});

// 홈 버튼
const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
homeBtn.addEventListener("click", () => {
    playClickSound();
    stopBGM();

    const gameContainer = document.getElementById("game-container")!;
    const startContainer = document.getElementById("start-container")!;
    startContainer.style.display = "flex";
    gameContainer.style.display = "none";
});

// 배경음 토글
const bgmToggle = document.getElementById("bgm-toggle") as HTMLButtonElement;
const bgmIcon = document.getElementById("bgm-icon") as HTMLImageElement;
bgmToggle.addEventListener("click", () => {
    if (isBGMPlaying()) {
        stopBGM();
        bgmIcon.src = "./src/svg/sound-off.svg";
    } else {
        playBGM();
        bgmIcon.src = "./src/svg/sound-on.svg";
    }
});

// 키 입력 처리 → 새 방식으로 이동 처리
document.addEventListener("keydown", (event: KeyboardEvent) => {
    const keyToDirection: { [key: string]: Direction } = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
    };
    const direction = keyToDirection[event.key];
    if (direction) {
        handleMove(direction);
    }
});

// 난이도 버튼
const level3Btn = document.querySelector(".level3-modal") as HTMLButtonElement;
const level4Btn = document.querySelector(".level4-modal") as HTMLButtonElement;
const level5Btn = document.querySelector(".level5-modal") as HTMLButtonElement;

function changeBoardSize(size: number) {
    setBoardSize(size);
    setupBoard();
    initGrid();
}

level3Btn.addEventListener("click", () => changeBoardSize(3));
level4Btn.addEventListener("click", () => changeBoardSize(4));
level5Btn.addEventListener("click", () => changeBoardSize(5));

// 터치 스와이프 이벤트
let startX = 0,
    startY = 0;
window.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});
window.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy)) {
        handleMove(dx > 0 ? "right" : "left");
    } else {
        handleMove(dy > 0 ? "down" : "up");
    }
});
//되돌리기 버튼
const undoBtn = document.getElementById("undo-btn") as HTMLButtonElement;
undoBtn.addEventListener("click", () => {
    playClickSound(); // 선택
    restorePreviousState();
});
