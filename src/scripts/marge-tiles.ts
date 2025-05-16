import { grid } from "./add-random-cell"; 
import { boardSize } from "./boardsize"; 
import { updateBoard } from "./board"; 
import { addScore } from "./score"; 

// 공통 병합 함수: 연속된 동일한 숫자를 하나로 병합하고 점수를 추가함
function mergeLine(tiles: number[]): number[] {
    const merged: number[] = [];
    let i = 0;
    while (i < tiles.length) {
        // 인접한 두 숫자가 같으면 병합
        if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
            merged.push(tiles[i] * 2); // 병합된 값을 추가
            addScore(tiles[i] * 2); // 점수 업데이트
            i += 2; // 두 칸 건너뜀
        } else {
            merged.push(tiles[i]); // 그대로 유지
            i++;
        }
    }
    return merged; // 병합 후 배열 반환
}

// 방향에 따라 타일을 병합하는 함수
export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    if (direction === "up") {
        // 각 열을 위쪽으로 병합
        for (let col = 0; col < boardSize; col++) {
            let colTiles = [];
            // 각 열의 0이 아닌 값을 위쪽 방향으로 모음
            for (let row = 0; row < boardSize; row++) {
                if (grid[row][col] !== 0) colTiles.push(grid[row][col]);
            }
            colTiles = mergeLine(colTiles); // 병합 처리
            // 병합된 결과를 위에서 아래로 다시 채워 넣음
            for (let row = 0; row < boardSize; row++) {
                grid[row][col] = colTiles[row] || 0;
            }
        }
    }

    if (direction === "down") {
        // 각 열을 아래쪽으로 병합
        for (let col = 0; col < boardSize; col++) {
            let colTiles = [];
            // 각 열의 0이 아닌 값을 아래 방향으로 모음
            for (let row = boardSize - 1; row >= 0; row--) {
                if (grid[row][col] !== 0) colTiles.push(grid[row][col]);
            }
            colTiles = mergeLine(colTiles); // 병합 처리
            // 병합된 결과를 아래에서 위로 다시 채워 넣음
            for (let row = 0; row < boardSize; row++) {
                grid[boardSize - 1 - row][col] = colTiles[row] || 0;
            }
        }
    }

    if (direction === "left") {
        // 각 행을 왼쪽으로 병합
        for (let row = 0; row < boardSize; row++) {
            let rowTiles = grid[row].filter(v => v !== 0); // 0을 제외한 타일 추출
            rowTiles = mergeLine(rowTiles); // 병합 처리
            // 병합 결과 + 빈 칸을 합쳐서 다시 행 구성
            grid[row] = [...rowTiles, ...Array(boardSize - rowTiles.length).fill(0)];
        }
    }

    if (direction === "right") {
        // 각 행을 오른쪽으로 병합
        for (let row = 0; row < boardSize; row++) {
            let rowTiles = grid[row].filter(v => v !== 0).reverse(); // 오른쪽 정렬을 위해 역순 처리
            rowTiles = mergeLine(rowTiles); // 병합 처리
            // 병합 결과를 다시 역순으로 돌려서 오른쪽 정렬된 행 구성
            grid[row] = [...Array(boardSize - rowTiles.length).fill(0), ...rowTiles.reverse()];
        }
    }

    // 100ms 후 보드를 업데이트하여 화면에 반영
    setTimeout(updateBoard, 100);
}
