import { boardSize } from "./boardsize";
export let grid: number[][] = createEmptyGrid();
//배열 초기화
export function createEmptyGrid(): number[][] {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
}
//배열 배치
export function setGrid(newGrid: number[][]) {
    grid = newGrid;
}
//빈셀 찾기
export function getEmptyCells(): { row: number; col: number }[] {
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    return emptyCells;
}
//빈셀에 2또는 4추가
export function addRandomCell(): void {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = Math.random() < 0.5 ? 2 : 4; //확률 50%
        grid[row][col] = newValue;
        const newValue = Math.random() < 0.9 ? 2 : 4; //확률 90%
        grid[row][col] = newValue;
    }
}
