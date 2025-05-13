const boardSize: number = 4; // 보드 크기
const board = document.getElementById("board") as HTMLElement; // 보드 요소
// 보드 스타일 설정
board.style.display = "grid";
board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
// 2D 배열 초기화
let grid: number[][] = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

function addRandomCell(): void {
    const emptyCells: { row: number; col: number }[] = [];

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];
        grid[row][col] = 2;
    }
}
