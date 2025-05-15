import "./style.css";
import "./anime/animation.css";
import "./scripts/find-move-tile";
import { setupBoard } from "./scripts/board";
import { startGame } from "./scripts/game-start";
import { playClickSound } from "./scripts/audio";


type Direction = "up" | "down" | "left" | "right";
//보드생성
setupBoard();
//시작버튼
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    startGame();
});
//재시작 버튼
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    startGame();
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
    //if (direction) move(direction); //이동용
});
