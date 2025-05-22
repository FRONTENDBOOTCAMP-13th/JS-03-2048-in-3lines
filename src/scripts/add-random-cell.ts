import { boardSize } from "./boardsize";
export let grid: number[][] = createEmptyGrid();
export let grid2: number[][] = createEmptyGrid();

// 빈 배열 생성
export function createEmptyGrid(): number[][] {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
}

// 배열 외부 설정
export function setGrid(newGrid: number[][]) {
    grid = newGrid.map(row => [...row]); // 깊은 복사
    grid2 = newGrid.map(row => [...row]); // 또 다른 복사
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
export function getEmptyCells2(): { row: number; col: number }[] {
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (grid2[row][col] === 0) {
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
export function addRandomCell2(isInit: boolean = false): void {
    const emptyCells = getEmptyCells2();
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newValue = Math.random() < 0.9 ? 2 : 4; //확률 90%
        grid2[row][col] = newValue;

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
        const newValue = -1;
        grid[row][col] = newValue;

        if (!isInit) {
            const cell = document.querySelector(`#grid-container .cell-${row}-${col}`);
            if (cell) cell.classList.add("new-tile");
        }
    }
}
