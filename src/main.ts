// 기존 코드 상단 부분 그대로 유지
import "./style.css";
import { setupBoard } from "./scripts/board";
import { initGrid } from "./scripts/game-start";
import { playClickSound, stopBGM, playBGM, isBGMPlaying } from "./scripts/audio";
import { setBoardSize } from "./scripts/boardsize";
import { setupModal } from "./scripts/modal";
import { handleMoveWrapper } from "./scripts/game-win";
import { restorePreviousState, backupGridState } from "./scripts/game-start";
import { resetScore } from "./scripts/score";

setupModal();
document.addEventListener("keydown", handleMoveWrapper);

document.addEventListener("DOMContentLoaded", () => {
    // 초기 상태 설정
    const bgmIcon = document.getElementById("bgm-icon") as HTMLImageElement;
    if (isBGMPlaying()) {
        bgmIcon.src = "./src/svg/sound-on.svg";
    } else {
        bgmIcon.src = "./src/svg/sound-off.svg";
    }
    // 상태 자동 갱신
    setInterval(() => {
        if (isBGMPlaying()) {
            if (bgmIcon.src.includes("sound-off.svg")) {
                bgmIcon.src = "./src/svg/sound-on.svg";
            }
        } else {
            if (bgmIcon.src.includes("sound-on.svg")) {
                bgmIcon.src = "./src/svg/sound-off.svg";
            }
        }
    }, 500);
});

// 보드 UI 구성
setupBoard();

// 시작 버튼 이벤트
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    resetScore();
    initGrid();
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
});

// 재시작 버튼 이벤트
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    playClickSound();
    initGrid();
    backupGridState();
});

// 되돌리기 버튼
const undoBtn = document.getElementById("undo-btn") as HTMLButtonElement;
undoBtn.addEventListener("click", () => {
    playClickSound();
    restorePreviousState();
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

// 배경음 토글 버튼
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

// 난이도 버튼
const level3Btn = document.querySelector(".level3-modal") as HTMLButtonElement;
const level4Btn = document.querySelector(".level4-modal") as HTMLButtonElement;
const level5Btn = document.querySelector(".level5-modal") as HTMLButtonElement;

function changeBoardSize(size: number) {
    setBoardSize(size);
    setupBoard();
    initGrid();

    // 난이도 텍스트도 같이 변경
    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `${size}*${size}`;
    }
}

level3Btn.addEventListener("click", () => changeBoardSize(3));
level4Btn.addEventListener("click", () => changeBoardSize(4));
level5Btn.addEventListener("click", () => changeBoardSize(5));

// 모바일에서 스크롤 방지 (스와이프는 허용)
document.addEventListener(
    "touchmove",
    function (e) {
        e.preventDefault();
    },
    { passive: false },
);

// 아래는 모바일 스와이프용
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 30) {
        if (absDx > absDy) {
            if (dx > 0) {
                handleMoveWrapper({ key: "ArrowRight" } as KeyboardEvent);
            } else {
                handleMoveWrapper({ key: "ArrowLeft" } as KeyboardEvent);
            }
        } else {
            if (dy > 0) {
                handleMoveWrapper({ key: "ArrowDown" } as KeyboardEvent);
            } else {
                handleMoveWrapper({ key: "ArrowUp" } as KeyboardEvent);
            }
        }
    }
});
