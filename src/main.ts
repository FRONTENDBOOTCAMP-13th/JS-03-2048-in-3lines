import "./style.css";
import "./anime/animation.css";
import { setupBoard } from "./scripts/board";
import { initGrid } from "./scripts/game-start";
import { playClickSound, stopBGM, playBGM, isBGMPlaying } from "./scripts/audio";
import { setupModal } from "./scripts/modal";
setupModal();
import { handleMoveWrapper } from "./scripts/game-win";
document.addEventListener("keydown", handleMoveWrapper);

// 보드 UI 구성
setupBoard();

// 시작 버튼 이벤트
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound();
    playBGM();
    initGrid();
    document.getElementById("start-container")!.style.display = "none";
    document.getElementById("game-container")!.style.display = "block";
});

// 재시작 버튼 이벤트
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    playClickSound();
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
