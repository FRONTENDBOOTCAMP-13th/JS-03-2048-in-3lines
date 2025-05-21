import "./style.css";
import { setupBoard, setupBoard2 } from "./scripts/board";
import {
    initGrid,
    HardinitGrid,
    timeAttackInitGrid,
    restorePreviousState,
    backupGridState,
    aiinitGrid,
} from "./scripts/game-start";
import { playClickSound, stopBGM, playBGM, isBGMPlaying } from "./scripts/audio";
import { setBoardSize } from "./scripts/boardsize";
import { setupModal } from "./scripts/modal";
import { handleMoveWrapper } from "./scripts/game-win";
import { resetScore } from "./scripts/score";
import { startAutoMove, stopAutoMove } from "./scripts/marge-tiles";

import soundOn from "./svg/sound-on.svg";
import soundOff from "./svg/sound-off.svg";
import { timeAttack, resetGameOver } from "./scripts/game-over";

// 하드모드 여부 변수
let isHardMode = false;
export let isTimeAttackMode = false;
//ai모드 여부 변수
export let isAIMode = false;

setupModal();
document.addEventListener("keydown", handleMoveWrapper);

// 초기 BGM 상태 아이콘 설정 및 주기적 갱신
const bgmIcon = document.getElementById("bgm-icon") as HTMLImageElement;
if (bgmIcon) {
    bgmIcon.src = isBGMPlaying() ? soundOn : soundOff;
    setInterval(() => {
        if (isBGMPlaying()) {
            if (bgmIcon.src.includes("sound-off.svg")) {
                bgmIcon.src = soundOn;
            }
        } else {
            if (bgmIcon.src.includes("sound-on.svg")) {
                bgmIcon.src = soundOff;
            }
        }
    }, 500);
}

// 보드 UI 구성
setupBoard();
setupBoard2();

// 시작 버튼 이벤트
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    resetScore();
    isTimeAttackMode = false;
    isHardMode = false; // 일반 모드
    isAIMode = false;
    initGrid();
    bgmIcon.src = soundOn;
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "none";
    resetGameOver();
});

// 타임어택 시작 버튼 이벤트
const timeAttackBtn = document.getElementById("time-attack-btn") as HTMLButtonElement;
timeAttackBtn.addEventListener("click", () => {
    isTimeAttackMode = true;
    playClickSound();
    playBGM();
    resetScore();
    timeAttackInitGrid();
    bgmIcon.src = soundOn;
    isHardMode = false;
    isAIMode = false;
    timeAttackInitGrid();
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "none";
    resetGameOver();
    timeAttack(); // 타임어택 모드에서만 실행
});

// 하드 시작 버튼 이벤트
const hardstartBtn = document.getElementById("hard-start-btn") as HTMLButtonElement;
hardstartBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    resetScore();
    isHardMode = true; // 하드 모드
    isAIMode = false;
    HardinitGrid();
    bgmIcon.src = soundOn;
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "none";
    resetGameOver();
});

//ai 시작 버튼 이벤트
const aistartBtn = document.getElementById("ai-start-btn") as HTMLButtonElement;
aistartBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    resetScore();
    setupBoard();
    setupBoard2();
    isHardMode = false;
    isAIMode = true;
    aiinitGrid(); // AI 보드 초기화
    startAutoMove();
    bgmIcon.src = soundOn;
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "grid";
    resetGameOver();
});

// 재시작 버튼 이벤트
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    resetGameOver();
    playClickSound();
    if (isAIMode) {
        aiinitGrid();
        startAutoMove();
    } else if (isHardMode) {
        HardinitGrid();
    } else if (isTimeAttackMode) {
        timeAttackInitGrid();
        timeAttack(); // 타임어택 모드에서만 재시작 시 타임어택 실행
    }
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
    stopAutoMove();
    isHardMode = false; // 하드 모드
    isAIMode = false;
    const gameContainer = document.getElementById("game-container")!;
    const startContainer = document.getElementById("start-container")!;
    startContainer.style.display = "flex";
    gameContainer.style.display = "none";
    resetGameOver();
});

// 배경음 토글 버튼
const bgmToggle = document.getElementById("bgm-toggle") as HTMLButtonElement;
bgmToggle.addEventListener("click", () => {
    if (isBGMPlaying()) {
        stopBGM();
        if (bgmIcon) bgmIcon.src = soundOff;
    } else {
        playBGM();
        if (bgmIcon) bgmIcon.src = soundOn;
    }
});

// 난이도 버튼
const level3Btn = document.querySelector(".level3-modal") as HTMLButtonElement;
const level4Btn = document.querySelector(".level4-modal") as HTMLButtonElement;
const level5Btn = document.querySelector(".level5-modal") as HTMLButtonElement;

function changeBoardSize(size: number) {
    resetGameOver();
    setBoardSize(size);
    if (isHardMode) {
        setupBoard();
        HardinitGrid();
    } else if (isAIMode) {
        setupBoard();
        setupBoard2();
        aiinitGrid();
    } else if (isTimeAttackMode) {
        setupBoard();
        timeAttackInitGrid();
        timeAttack(); // 타임어택 모드에서만 실행
    } else {
        setupBoard();
        initGrid();
    }

    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `${size}*${size}`;
    }
}
level3Btn.addEventListener("click", () => {
    changeBoardSize(3);
});
level4Btn.addEventListener("click", () => {
    changeBoardSize(4);
});
level5Btn.addEventListener("click", () => {
    changeBoardSize(5);
});
// 모바일에서 스크롤 방지 (스와이프는 허용)
document.addEventListener(
    "touchmove",
    function (e) {
        e.preventDefault();
    },
    { passive: false },
);

// 모바일 스와이프 처리
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
