import "./style.css";
import { setupBoard } from "./scripts/board";
import { startGame } from "./scripts/game-start";
type Direction = "up" | "down" | "left" | "right";
//보드생성
setupBoard();
//시작버튼
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => startGame());
//재시작 버튼
const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => startGame());
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
