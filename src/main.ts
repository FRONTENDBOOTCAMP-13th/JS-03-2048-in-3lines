import "./style.css";
import "./anime/animation.css";
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
import { timeAttack, resetGameOver, isGameOver } from "./scripts/game-over";

// 하드모드 여부 변수
let isHardMode = false;
export let isTimeAttackMode = false;
//ai모드 여부 변수
export let isAIMode = false;

const aiScore = document.getElementById("ai-score");
const socreBoard = aiScore!.parentElement;
const hpBar = document.getElementsByClassName("time-attack-container")[0] as HTMLDivElement;
const gameScreendSize = document.getElementById("game-screen-box") as HTMLElement;
console.log(gameScreendSize);
setupModal();
document.addEventListener("keydown", handleMoveWrapper);

function isMobile() {
    return window.innerWidth <= 767;
}

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
    setBoardSize(4);
    setupBoard();
    initGrid();
    bgmIcon.src = soundOn;
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "none";
    resetGameOver();
    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `4*4`;
    }
    socreBoard!.style.display = "none"; // AI 점수판 숨기기
    gameScreendSize.style.width = "32vw";
    if (isMobile()) {
        gameScreendSize.style.width = "91vw";
    }
    hpBar!.style.display = "none";
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
    setBoardSize(4);
    setupBoard();
    timeAttackInitGrid();
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "none";
    resetGameOver();
    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `4*4`;
    }
    hpBar!.style.display = "flex";
    socreBoard!.style.display = "none"; // AI 점수판 숨기기
    if (isMobile()) {
        gameScreendSize.style.width = "91vw";
        document.getElementById("time-attack-hp")?.classList.add("animate-hp-mobile");
        setTimeout(() => {
            document.getElementById("time-attack-hp")?.classList.remove("animate-hp-mobile");
        }, 120000);
    } else {
        gameScreendSize.style.width = "32vw";
        document.getElementById("time-attack-hp")?.classList.add("animate-hp");
        setTimeout(() => {
            document.getElementById("time-attack-hp")?.classList.remove("animate-hp");
        }, 120000);
    }
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
    isTimeAttackMode = false;
    setBoardSize(4);
    setupBoard();
    HardinitGrid();
    bgmIcon.src = soundOn;
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "none";
    resetGameOver();
    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `4*4`;
    }
    socreBoard!.style.display = "none"; // AI 점수판 숨기기
    gameScreendSize.style.width = "32vw";
    hpBar!.style.display = "none";
    if (isMobile()) {
        gameScreendSize.style.width = "91vw";
    }
});

//ai 시작 버튼 이벤트
const aistartBtn = document.getElementById("ai-start-btn") as HTMLButtonElement;
aistartBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    resetScore();
    setupBoard();
    setupBoard2();
    isTimeAttackMode = false;
    isHardMode = false;
    isAIMode = true;
    setBoardSize(4);
    setupBoard();
    setupBoard2();
    aiinitGrid(); // AI 보드 초기화
    startAutoMove();
    bgmIcon.src = soundOn;
    backupGridState();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
    document.getElementById("board2")!.style.display = "grid";
    resetGameOver();
    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `4*4`;
    }
    socreBoard!.style.display = "flex"; // AI 점수판 숨기기
    hpBar!.style.display = "none";
    gameScreendSize.style.width = "64vw";
});

// 재시작 버튼 이벤트
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    resetGameOver();
    playClickSound();
    if (isAIMode) {
        gameScreendSize.style.width = "64vw";
        aiinitGrid();
        startAutoMove();
    } else if (isHardMode) {
        gameScreendSize.style.width = "32vw";
        if (isMobile()) {
            gameScreendSize.style.width = "91vw";
        }
        HardinitGrid();
    } else if (isTimeAttackMode) {
        gameScreendSize.style.width = "32vw";
        const hpBar = document.getElementById("time-attack-hp") as HTMLDivElement;
        if (hpBar) {
            hpBar.classList.remove("animate-hp", "animate-hp-mobile");
            if (isMobile()) {
                hpBar.style.width = "79.5vw";
                gameScreendSize.style.width = "91vw";
            } else {
                hpBar.style.width = "27.7vw";
                gameScreendSize.style.width = "32vw";
            }
            void hpBar.offsetWidth;
            setTimeout(() => {
                if (isMobile()) {
                    hpBar.classList.add("animate-hp-mobile");
                } else {
                    hpBar.classList.add("animate-hp");
                }
            }, 0);
        }
        timeAttackInitGrid();
        timeAttack();
    } else {
        gameScreendSize.style.width = "32vw";
        if (isMobile()) {
            gameScreendSize.style.width = "91vw";
        }
        initGrid();
    }
    backupGridState();
});

// 되돌리기 버튼
const undoBtn = document.getElementById("undo-btn") as HTMLButtonElement;
undoBtn.addEventListener("click", () => {
    if (isGameOver) return; // 게임오버 시 실행취소 불가
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
    document.getElementById("time-attack-hp")?.classList.remove("animate-hp", "animate-hp-mobile");
    resetGameOver();
});

// 배경음 토글 버튼
const bgmToggle = document.getElementById("bgm-icon") as HTMLButtonElement;
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
        gameScreendSize.style.width = "32vw";
        if (isMobile()) {
            gameScreendSize.style.width = "91vw";
            setupBoard();
        }
        setupBoard();
        HardinitGrid();
    } else if (isAIMode) {
        setupBoard();
        setupBoard2();
        aiinitGrid();
    } else if (isTimeAttackMode) {
        gameScreendSize.style.width = "32vw";
        const hpBar = document.getElementById("time-attack-hp") as HTMLDivElement;
        if (hpBar) {
            hpBar.classList.remove("animate-hp", "animate-hp-mobile");
            if (isMobile()) {
                hpBar.style.width = "79.5vw";
                gameScreendSize.style.width = "91vw";
            } else {
                hpBar.style.width = "27.7vw";
                gameScreendSize.style.width = "32vw";
            }
            void hpBar.offsetWidth;
            setTimeout(() => {
                if (isMobile()) {
                    hpBar.classList.add("animate-hp-mobile");
                } else {
                    hpBar.classList.add("animate-hp");
                }
            }, 0);
            setupBoard();
            timeAttackInitGrid();
            timeAttack();
        }
    } else {
        gameScreendSize.style.width = "32vw";
        setupBoard();
        if (isMobile()) {
            gameScreendSize.style.width = "91vw";
            setupBoard();
        }
        initGrid();
    }
    const levelText = document.querySelector(".level-text2") as HTMLElement;
    if (levelText) {
        levelText.textContent = `${size}*${size}`;
    }
    // 모달 닫기
    const levelWrapper = document.querySelector(".level") as HTMLElement;
    levelWrapper?.classList.remove("open");
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
