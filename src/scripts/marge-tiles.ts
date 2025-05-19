import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard } from "./board";
import { addScore } from "./score";
import { tilesSearch } from "./grid-cell-verification-logic";
import { checkWin } from "./game-win";

// 연속된 동일한 숫자를 하나로 병합하고 점수를 추가하는 함수
function mergeLine(tiles: number[]): number[] {
    const merged: number[] = [];
    let i = 0;
    while (i < tiles.length) {
        // 인접한 두 숫자가 같으면 병합
        if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
            merged.push(tiles[i] * 2); // 병합된 값을 추가
            addScore(tiles[i] * 2); // 점수 업데이트
            i += 2; // 두 칸 건너뜀(중복 병합 방지)
        } else {
            merged.push(tiles[i]); // 그대로 유지
            i++;
        }
    }
    return merged; // 병합 후 배열 반환
}

// 방향에 따라 타일을 병합하는 함수
export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    // 위쪽 방향 병합
    if (direction === "up") {
        const tiles = tilesSearch(); // 현재 grid에서 0이 아닌 셀의 {row, col, value} 배열 반환
        for (let col = 0; col < boardSize; col++) {
            // 해당 col에서 0이 아닌 타일만 추출
            let colTiles = tiles.filter(tile => tile.col === col);
            let rowTiles = colTiles.sort((a, b) => a.row - b.row);
            let tileMap = rowTiles.map(tile => tile.value);
            // 병합 처리
            const merged = mergeLine(tileMap);
            // 디버깅용 로그
            console.log(`[UP][col=${col}] 0이 아닌 타일(객체) 목록:`, colTiles);
            console.log(`[UP][col=${col}] row 오름차순 정렬된 타일(객체) 목록:`, rowTiles);
            console.log(`[UP][col=${col}] 정렬된 타일의 value 배열:`, tileMap);
            console.log(`[UP][col=${col}] 병합된 value 배열:`, merged);

            for (let row = 0; row < boardSize; row++) {
                grid[row][col] = merged[row] || 0; // 병합된 결과를 위에서 아래로 다시 grid에 반영
            }
        }
    }

    // 아래쪽 방향 병합
    if (direction === "down") {
        const tiles = tilesSearch();
        for (let col = 0; col < boardSize; col++) {
            // 2. 해당 col에서 0이 아닌 타일만 추출
            const colTiles = tiles.filter(tile => tile.col === col);
            // 3. row 내림차순(아래에서 위로) 정렬
            const rowTiles = colTiles.sort((a, b) => b.row - a.row);
            // 4. value만 추출
            const tileMap = rowTiles.map(tile => tile.value);
            // 5. 병합 처리
            const merged = mergeLine(tileMap);

            // 디버깅용 로그
            console.log(`[DOWN][col=${col}] 0이 아닌 타일(객체) 목록:`, colTiles);
            console.log(`[DOWN][col=${col}] row 내림차순 정렬된 타일(객체) 목록:`, rowTiles);
            console.log(`[DOWN][col=${col}] 정렬된 타일의 value 배열:`, tileMap);
            console.log(`[DOWN][col=${col}] 병합된 value 배열:`, merged);

            // 6. 병합된 결과를 아래에서 위로 다시 grid에 반영
            for (let row = 0; row < boardSize; row++) {
                grid[boardSize - 1 - row][col] = merged[row] || 0;
            }
        }
    }

    // 왼쪽 방향 병합
    if (direction === "left") {
        const tiles = tilesSearch();
        for (let row = 0; row < boardSize; row++) {
            // 2. 해당 row에서 0이 아닌 타일만 추출
            const rowTiles = tiles.filter(tile => tile.row === row);
            // 3. col 오름차순(왼쪽에서 오른쪽으로) 정렬
            const colTiles = rowTiles.sort((a, b) => a.col - b.col);
            // 4. value만 추출
            const tileMap = colTiles.map(tile => tile.value);
            // 5. 병합 처리
            const merged = mergeLine(tileMap);

            // 디버깅용 로그
            console.log(`[LEFT][row=${row}] 0이 아닌 타일(객체) 목록:`, rowTiles);
            console.log(`[LEFT][row=${row}] col 오름차순 정렬된 타일(객체) 목록:`, colTiles);
            console.log(`[LEFT][row=${row}] 정렬된 타일의 value 배열:`, tileMap);
            console.log(`[LEFT][row=${row}] 병합된 value 배열:`, merged);

            // 6. 병합된 결과를 왼쪽에서 오른쪽으로 다시 grid에 반영
            for (let col = 0; col < boardSize; col++) {
                grid[row][col] = merged[col] || 0;
            }
        }
    }

    // 오른쪽 방향 병합
    if (direction === "right") {
        const tiles = tilesSearch();
        for (let row = 0; row < boardSize; row++) {
            // 2. 해당 row에서 0이 아닌 타일만 추출
            const rowTiles = tiles.filter(tile => tile.row === row);
            // 3. col 내림차순(오른쪽에서 왼쪽으로) 정렬
            const colTiles = rowTiles.sort((a, b) => b.col - a.col);
            // 4. value만 추출
            const tileMap = colTiles.map(tile => tile.value);
            // 5. 병합 처리
            const merged = mergeLine(tileMap);

            // 디버깅용 로그
            console.log(`[RIGHT][row=${row}] 0이 아닌 타일(객체) 목록:`, rowTiles);
            console.log(`[RIGHT][row=${row}] col 내림차순 정렬된 타일(객체) 목록:`, colTiles);
            console.log(`[RIGHT][row=${row}] 정렬된 타일의 value 배열:`, tileMap);
            console.log(`[RIGHT][row=${row}] 병합된 value 배열:`, merged);

            // 6. 병합된 결과를 오른쪽에서 왼쪽으로 다시 grid에 반영
            for (let col = 0; col < boardSize; col++) {
                grid[row][boardSize - 1 - col] = merged[col] || 0;
            }
        }
    }

    updateBoard();
    checkWin();
}
