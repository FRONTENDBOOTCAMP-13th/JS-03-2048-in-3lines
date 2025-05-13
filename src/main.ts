import "./style.css";
import "./scripts/find-move-tile";

const boardSize: number = 4; // 보드 크기
const board = document.getElementById("board") as HTMLElement; // 보드 요소

// 보드 스타일 설정
board.style.display = "grid";
board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

// 2D 배열 초기화
let grid: number[][] = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

// 보드 업데이트 함수
function updateBoard(): void {
    board.innerHTML = ""; // 초기화
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const value = grid[row][col];
            if (value !== 0) {
                cell.textContent = value.toString();
                cell.dataset.value = value.toString();
            }

            board.appendChild(cell);
        }
    }

    // TODO: 점수 계산, 게임오버 판별, 상태 저장
}

// 비어있는 셀에 2 추가
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

// 키보드 입력 처리
document.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.key) {
        case "ArrowUp":
            move("up");
            break;
        case "ArrowDown":
            move("down");
            break;
        case "ArrowLeft":
            move("left");
            break;
        case "ArrowRight":
            move("right");
            break;
    }
});

// 이동 방향 타입
type Direction = "up" | "down" | "left" | "right";

// 이동 로직
function move(direction: Direction): void {
    // TODO: 이동 전 배열 저장
    switch (direction) {
        case "up":
            // TODO: 위로 이동 로직
            break;
        case "down":
            // TODO: 아래로 이동 로직
            break;
        case "left":
            // TODO: 왼쪽 이동 로직
            break;
        case "right":
            // TODO: 오른쪽 이동 로직
            break;
    }
    // TODO: 이동 후 변경 확인 및 새로운 셀 추가
    updateBoard();
}

// 병합 로직 (작성 필요)
function mergeTiles(): void {
    // TODO: 병합 구현
}

// 실행 취소
function reverseTiles(): void {
    // TODO: 이전 상태로 되돌리기
}

// 난이도 변경
function changeLevel(): void {
    // TODO: 난이도 UI 및 보드 크기 변경 처리
}

// 초기 시작
addRandomCell();
addRandomCell();
updateBoard();
