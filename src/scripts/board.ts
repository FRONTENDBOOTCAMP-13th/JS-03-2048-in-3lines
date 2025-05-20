import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
//보드 요소
const board = document.getElementById("board") as HTMLElement;
//보드 속성, 크기 설정
export function setupBoard(): void {
    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
}
// 보드 업데이트
export function updateBoard(): void {
    board.innerHTML = "";
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const divContainer = document.querySelector("#board");
            const box = document.createElement("div");
            box.classList.add("box");
            const cell = document.createElement("div");
            cell.classList.add("cell"); //클래스 부여
            const value = grid[row][col];
            if (value !== 0) {
                cell.textContent = value.toString();
                cell.dataset.value = value.toString();
                cell.dataset.row = row.toString();
                cell.dataset.col = col.toString();
            }
            divContainer?.appendChild(box);
            box!.appendChild(cell);
        }
    }
}
