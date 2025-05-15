import "./style.css";
import "./anime/animation.css";
import "./scripts/find-move-tile";
import { findMovetile } from "./scripts/find-move-tile";
import { MoveTile } from "./scripts/tilemove";
import { setupBoard } from "./scripts/board";
import { startGame, restartGame } from "./scripts/game-start";
import { addRandomCell } from "./scripts/add-random-cell";
import { playClickSound, stopBGM, playBGM, isBGMPlaying } from "./scripts/audio";

type Direction = "up" | "down" | "left" | "right";

// 전체 맵
let Map: number[][];
let elements: HTMLDivElement[];

//보드생성
setupBoard();
//시작버튼
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    startGame();
    // div 박스들
    elements = Array.from(document.querySelectorAll("#board div")) as HTMLDivElement[];
    // 배열 세팅(div 요소, 가로 길이)
    boradSetting(elements, 4);
});
//재시작 버튼
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    restartGame();
});
//홈버튼
const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
homeBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    stopBGM();
    const gameContainer = document.getElementById("game-container")!;
    const startContainer = document.getElementById("start-container")!;
    startContainer.style.display = "block";
    gameContainer.style.display = "none";
});
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
//키보드입력값
document.addEventListener("keydown", (event: KeyboardEvent) => {
    const keyToDirection: { [key: string]: Direction } = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
    };
    const direction = keyToDirection[event.key];

    // 타일 이동

    // 배열 세팅(div 요소, 가로 길이)
    elements = Array.from(document.querySelectorAll("#board div")) as HTMLDivElement[];
    boradSetting(elements, 4);

    // 타일 이동
    const changeData: number[][] = findMovetile(Map, direction);
    MoveTile(changeData, elements, Map.length);
    addRandomCell();
});

// 현재 맵에서 배열 세팅하는 함수
function boradSetting(elements: HTMLDivElement[], Length: number) {
    // 배열 초기화
    Map = Array.from({ length: Length }, () => Array(Length).fill(0));

    elements.forEach((item, index) => {
        let dataset = item.dataset.value;
        let data: number = 0;

        if (dataset === undefined) data = 0;
        else data = parseInt(dataset);

        Map[Math.floor(index / Length)][Math.floor(index % Length)] = data;
    });
}
