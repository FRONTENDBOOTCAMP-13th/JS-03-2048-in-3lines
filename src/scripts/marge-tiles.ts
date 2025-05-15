import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard } from "./board";

export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    if (direction === "up") {
        for (let col = 0; col < boardSize; col++) {
            for (let row = 1; row < boardSize; row++) {
                const currentCell = grid[row][col];
                const targetCell = grid[row - 1][col];
                if (currentCell !== 0 && currentCell === targetCell) {
                    mergeUpDown(row, col, row - 1, col);
                }
            }
        }
    }
    if (direction === "down") {
        for (let col = 0; col < boardSize; col++) {
            for (let row = boardSize - 2; row >= 0; row--) {
                const currentCell = grid[row][col];
                const targetCell = grid[row + 1][col];
                if (currentCell !== 0 && currentCell === targetCell) {
                    mergeUpDown(row, col, row + 1, col);
                }
            }
        }
    }
    if (direction === "left") {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 1; col < boardSize; col++) {
                const currentCell = grid[row][col];
                const targetCell = grid[row][col - 1];
                if (currentCell !== 0 && currentCell === targetCell) {
                    mergeLeftRight(row, col, row, col - 1);
                }
            }
        }
    }
    if (direction === "right") {
        for (let row = 0; row < boardSize; row++) {
            for (let col = boardSize - 2; col >= 0; col--) {
                const currentCell = grid[row][col];
                const targetCell = grid[row][col + 1];
                if (currentCell !== 0 && currentCell === targetCell) {
                    mergeLeftRight(row, col, row, col + 1);
                }
            }
        }
    }

    setTimeout(() => {
        updateBoard();
    }, 600);
}

export function mergeUpDown(
    currentCellRow: number,
    currentCellCol: number,
    targetCellRow: number,
    targetCellCol: number,
): void {
    grid[targetCellRow][targetCellCol] *= 2;
    grid[currentCellRow][currentCellCol] = 0;

    const targetCell = document.querySelector(
        `[data-row="${targetCellRow}"][data-col="${targetCellCol}"]`,
    ) as HTMLElement; // 병합할 셀 선택(data-row 값이 targetCellRow 인속성과  data-col의 값이 targetCellCol 속성을 모두 가진 요소노드를 선택)
    const currentCell = document.querySelector(
        `[data-row="${currentCellRow}"][data-col="${currentCellCol}"]`,
    ) as HTMLElement; // 병합될 셀 선택(data-row 값이 currentCellRow 인속성과  data-col의 값이 currentCellCol 속성을 모두 가진 요소노드를 선택)

    if (targetCell) {
        targetCell.dataset.value = grid[targetCellRow][targetCellCol].toString();
        targetCell.textContent = grid[targetCellRow][targetCellCol].toString();

        setTimeout(() => {
            targetCell.classList.add("jello-vertical");
        }, 200);
        setTimeout(() => {
            targetCell.classList.remove("jello-vertical");
        }, 800);
    }

    if (currentCell) {
        currentCell.textContent = "";
        currentCell.dataset.value = "";
    }
}
export function mergeLeftRight(
    currentCellRow: number,
    currentCellCol: number,
    targetCellRow: number,
    targetCellCol: number,
): void {
    grid[targetCellRow][targetCellCol] *= 2;
    grid[currentCellRow][currentCellCol] = 0;

    const targetCell = document.querySelector(
        `[data-row="${targetCellRow}"][data-col="${targetCellCol}"]`,
    ) as HTMLElement; // 병합할 셀 선택(data-row 값이 targetCellRow 인속성과  data-col의 값이 targetCellCol 속성을 모두 가진 요소노드를 선택)
    const currentCell = document.querySelector(
        `[data-row="${currentCellRow}"][data-col="${currentCellCol}"]`,
    ) as HTMLElement; // 병합될 셀 선택(data-row 값이 currentCellRow 인속성과  data-col의 값이 currentCellCol 속성을 모두 가진 요소노드를 선택)

    if (targetCell) {
        targetCell.dataset.value = grid[targetCellRow][targetCellCol].toString();
        targetCell.textContent = grid[targetCellRow][targetCellCol].toString();

        setTimeout(() => {
            targetCell.classList.add("jello-horizontal");
        }, 200);
        setTimeout(() => {
            targetCell.classList.remove("jello-horizontal");
        }, 800);
    }

    if (currentCell) {
        currentCell.textContent = "";
        currentCell.dataset.value = "";
    }
}
