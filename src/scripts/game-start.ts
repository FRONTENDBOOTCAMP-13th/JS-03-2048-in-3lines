import { createEmptyGrid, setGrid, addRandomCell } from "./add-random-cell";
import { updateBoard } from "./board";
import { mergeTiles } from "./marge-tiles";
//게임 시작
export function startGame(): void {
    const gameContainer = document.getElementById("game-container")!;
    const startContainer = document.getElementById("start-container")!;
    startContainer.style.display = "none";
    gameContainer.style.display = "block";
    const newGrid = createEmptyGrid(); //배열생성
    setGrid(newGrid); //배열 배치
    addRandomCell(); //빈셀에 2생성
    addRandomCell(); //빈셀에 2생성
    updateBoard(); //보드 업데이트

    
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
