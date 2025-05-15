import { createEmptyGrid, setGrid, addRandomCell } from "./add-random-cell";
import { updateBoard } from "./board";
import { mergeTiles } from "./marge-tiles";
import { playBGM } from "./audio";
import { resetScore, renderScores } from "./score";
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
    resetScore(); //점수초기화
    renderScores(); //점수표시
    //입력된 키에 따라 사용할 함수
    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "ArrowUp":
                mergeTiles("up");
                break;
            case "ArrowDown":
                mergeTiles("down");
                break;
            case "ArrowLeft":
                mergeTiles("left");
                break;
            case "ArrowRight":
                mergeTiles("right");
                break;
        }
    });
}
export function restartGame(): void {
    const gameContainer = document.getElementById("game-container")!;
    const startContainer = document.getElementById("start-container")!;
    startContainer.style.display = "none";
    gameContainer.style.display = "block";
    const newGrid = createEmptyGrid(); //배열생성
    setGrid(newGrid); //배열 배치
    addRandomCell(); //빈셀에 2생성
    addRandomCell(); //빈셀에 2생성
    updateBoard(); //보드 업데이트
    resetScore(); //점수초기화
    renderScores(); //점수표시
    //입력된 키에 따라 사용할 함수
    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "ArrowUp":
                mergeTiles("up");
                break;
            case "ArrowDown":
                mergeTiles("down");
                break;
            case "ArrowLeft":
                mergeTiles("left");
                break;
            case "ArrowRight":
                mergeTiles("right");
                break;
        }
    });
}
