import { boardSize } from "./boardsize";
import { grid } from "./add-random-cell";
import { updateBoard } from "./board";


export function mergeTiles(direction: "up" | "down" | "right" | "left"): void {
    const targetBoxs = document.querySelectorAll(`[data-value]`);
    targetBoxs.forEach(box => {
        const htmlBox = box as HTMLElement;
        for (const row in grid) {
            for (const col in grid[row]) {
                const rowIndex = Number(row);
                const colIndex = Number(col);
                const value = grid[rowIndex][colIndex];
                if (value !== 0) {
                    if (
                        direction === "up" &&
                        rowIndex - 1 >= 0 &&
                        grid[rowIndex - 1][colIndex] === value
                    ) {
                        mergeUp(rowIndex, colIndex, htmlBox);
                    } else if (
                        direction === "down" &&
                        rowIndex + 1 < boardSize &&
                        grid[rowIndex + 1][colIndex] === value
                    ) {
                        mergeDown(rowIndex, colIndex, htmlBox);
                    } else if (
                        direction === "left" &&
                        colIndex - 1 >= 0 &&
                        grid[rowIndex][colIndex - 1] === value
                    ) {
                        mergeLeft(rowIndex, colIndex, htmlBox);
                    } else if (
                        direction === "right" &&
                        colIndex + 1 < boardSize &&
                        grid[rowIndex][colIndex + 1] === value
                    ) {
                        mergeRight(rowIndex, colIndex, htmlBox);
                    }
                }
            }
        }
    });
    updateBoard();
}

//위로 병합
function mergeUp(row: number, col: number, box: HTMLElement): void {
    grid[row - 1][col] *= 2;
    grid[row][col] = 0;
    box.dataset.value = grid[row - 1][col].toString();
    box.textContent = grid[row - 1][col].toString();
}

//아래로 병합
function mergeDown(row: number, col: number, box: HTMLElement): void {
    grid[row + 1][col] *= 2;
    grid[row][col] = 0;
    box.dataset.value = grid[row + 1][col].toString();
    box.textContent = grid[row + 1][col].toString();
}

//왼쪽으로 병합
function mergeLeft(row: number, col: number, box: HTMLElement): void {
    grid[row][col - 1] *= 2;
    grid[row][col] = 0;
    box.dataset.value = grid[row][col - 1].toString();
    box.textContent = grid[row][col - 1].toString();
}

//오른쪽으로 병합
function mergeRight(row: number, col: number, box: HTMLElement): void {
    grid[row][col + 1] *= 2;
    grid[row][col] = 0;
    box.dataset.value = grid[row][col + 1].toString();
    box.textContent = grid[row][col + 1].toString();
}
