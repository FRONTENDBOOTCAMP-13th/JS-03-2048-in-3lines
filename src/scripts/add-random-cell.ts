import { boardSize } from "./boardsize";
export let grid: number[][] = createEmptyGrid();

// 빈 배열 생성
export function createEmptyGrid(): number[][] {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
}

// 배열 외부 설정
export function setGrid(newGrid: number[][]) {
    grid = newGrid;
}

// 빈 셀 좌표 반환
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

// 빈 셀에 랜덤 2 또는 4 추가
export function addRandomCell(isInit: boolean = false): void {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = Math.random() < 0.9 ? 2 : 4; //확률 90%
        grid[row][col] = newValue;

        if (!isInit) {
            const cell = document.querySelector(`#grid-container .cell-${row}-${col}`);
            if (cell) cell.classList.add("new-tile");
        }
    }
}
// 빈 셀에 랜덤 이동불가 생성
export function addRandomXCell(isInit: boolean = false): void {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = -1; //확률 90%
        grid[row][col] = newValue;

        if (!isInit) {
            const cell = document.querySelector(`#grid-container .cell-${row}-${col}`);
            if (cell) cell.classList.add("new-tile");
        }
    }
}
