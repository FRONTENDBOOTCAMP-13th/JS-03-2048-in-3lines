import { grid, grid2 } from "./add-random-cell";
import { boardSize } from "./boardsize";

// 보드 요소
const board = document.getElementById("board") as HTMLElement;
const board2 = document.getElementById("board2") as HTMLElement;

//공통 보드 렌더링 함수
function renderBoard(grid: number[][], boardElement: HTMLElement): void {
    boardElement.innerHTML = "";

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const box = document.createElement("div");
            box.classList.add("box");

            const cell = document.createElement("div");
            cell.classList.add("cell");

            const value = grid[row][col];
            if (value !== 0) {
                cell.textContent = value.toString();
                cell.dataset.value = value.toString();
                cell.dataset.row = row.toString();
                cell.dataset.col = col.toString();
            }

            box.appendChild(cell);
            boardElement.appendChild(box);
        }
    }
}

// 보드 속성 및 크기 설정
export function setupBoard(): void {
    [board, board2].forEach(b => {
        b.style.display = "grid";
        b.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        b.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
    });
}

// 사용자 보드 업데이트
export function updateBoard(): void {
    renderBoard(grid, board);
}

// AI 보드 업데이트
export function updateBoard2(): void {
    renderBoard(grid2, board2);
}
