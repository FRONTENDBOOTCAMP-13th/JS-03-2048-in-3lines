import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard } from "./board";
import { addScore } from "./score";
import { tilesSearch } from "./grid-cell-verification-logic";
import { checkWin } from "./game-win";

// -1 고정 타일을 경계로 타일 병합 후 다시 위치에 삽입하는 함수
function mergeLine(tiles: number[]): number[] {
    const mergedWithFixed: number[] = [];
    let startIdx = 0;

    while (startIdx < tiles.length) {
        // 다음 -1 위치 찾기 (startIdx 포함 이후)
        let endIdx = tiles.indexOf(-1, startIdx);
        if (endIdx === -1) endIdx = tiles.length; // -1 없으면 끝까지

        // 현재 구간 (startIdx ~ endIdx-1) 처리
        const segment = tiles.slice(startIdx, endIdx);
        const filtered = segment.filter(v => v > 0); // 0과 -1 제외

        // 병합 처리
        const mergedSegment: number[] = [];
        let i = 0;
        while (i < filtered.length) {
            if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                mergedSegment.push(filtered[i] * 2);
                addScore(filtered[i] * 2);
                i += 2;
            } else {
                mergedSegment.push(filtered[i]);
                i++;
            }
        }

        // 병합된 결과 + 0 패딩 (segment 길이만큼)
        while (mergedSegment.length < segment.length) {
            mergedSegment.push(0);
        }

        // 결과 합침
        mergedWithFixed.push(...mergedSegment);

        // 만약 endIdx가 tiles 길이면 종료
        if (endIdx === tiles.length) break;

        // -1 고정 타일 삽입
        mergedWithFixed.push(-1);

        // 다음 구간 시작
        startIdx = endIdx + 1;
    }

    return mergedWithFixed;
}

// 방향에 따라 타일 병합 (고정 타일 처리 포함)
export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    const tiles = tilesSearch(); // value !== 0 or -1 포함하도록 구현되어야 함

    if (direction === "up") {
        for (let col = 0; col < boardSize; col++) {
            const colTiles = tiles.filter(tile => tile.col === col);
            const rowTiles = colTiles.sort((a, b) => a.row - b.row);
            const tileMap: number[] = Array(boardSize).fill(0);
            rowTiles.forEach(tile => {
                tileMap[tile.row] = tile.value;
            });

            const merged = mergeLine(tileMap);
            for (let row = 0; row < boardSize; row++) {
                grid[row][col] = merged[row];
            }
        }
    }

    if (direction === "down") {
        for (let col = 0; col < boardSize; col++) {
            const colTiles = tiles.filter(tile => tile.col === col);
            const rowTiles = colTiles.sort((a, b) => b.row - a.row);
            const tileMap: number[] = Array(boardSize).fill(0);
            rowTiles.forEach(tile => {
                tileMap[boardSize - 1 - tile.row] = tile.value;
            });

            const merged = mergeLine(tileMap);
            for (let row = 0; row < boardSize; row++) {
                grid[boardSize - 1 - row][col] = merged[row];
            }
        }
    }

    if (direction === "left") {
        for (let row = 0; row < boardSize; row++) {
            const rowTiles = tiles.filter(tile => tile.row === row);
            const colTiles = rowTiles.sort((a, b) => a.col - b.col);
            const tileMap: number[] = Array(boardSize).fill(0);
            colTiles.forEach(tile => {
                tileMap[tile.col] = tile.value;
            });

            const merged = mergeLine(tileMap);
            for (let col = 0; col < boardSize; col++) {
                grid[row][col] = merged[col];
            }
        }
    }

    if (direction === "right") {
        for (let row = 0; row < boardSize; row++) {
            const rowTiles = tiles.filter(tile => tile.row === row);
            const colTiles = rowTiles.sort((a, b) => b.col - a.col);
            const tileMap: number[] = Array(boardSize).fill(0);
            colTiles.forEach(tile => {
                tileMap[boardSize - 1 - tile.col] = tile.value;
            });

            const merged = mergeLine(tileMap);
            for (let col = 0; col < boardSize; col++) {
                grid[row][boardSize - 1 - col] = merged[col];
            }
        }
    }

    updateBoard();
    checkWin();
}
