import { createEmptyGrid, setGrid, addRandomCell } from "./add-random-cell";
import { updateBoard } from "./board";
import { playBGM } from "./audio";
//게임 시작
export function startGame(): void {
    const gameContainer = document.getElementById("game-container")!;
    const startContainer = document.getElementById("start-container")!;
    startContainer.style.display = "none";
    gameContainer.style.display = "block";
    playBGM(); //배경음악 재생
    const newGrid = createEmptyGrid(); //배열생성
    setGrid(newGrid); //배열 배치
    addRandomCell(); //빈셀에 2생성
    addRandomCell(); //빈셀에 2생성
    updateBoard(); //보드 업데이트
}
