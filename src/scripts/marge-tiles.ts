import { addRandomCell2, grid, grid2 } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard, updateBoard2 } from "./board";
import { addScore, aiaddScore } from "./score"; // aiaddScore 추가 임포트
import { tilesSearch } from "./grid-cell-verification-logic";
import { checkWin } from "./game-win";
import { canMoveOrMerge2 } from "./can-move";
import { checkGameOver2 } from "./game-over";

// 공통 mergeLine 함수, 점수 추가 함수 주입 + 점수 추가 여부 제어
function mergeLineWithScore(
    tiles: number[],
    shouldAddScore: boolean,
    addScoreFn: (value: number) => void,
): number[] {
    const mergedWithFixed: number[] = [];
    let startIdx = 0;

    while (startIdx < tiles.length) {
        let endIdx = tiles.indexOf(-1, startIdx);
        if (endIdx === -1) endIdx = tiles.length;

        const segment = tiles.slice(startIdx, endIdx);
        const filtered = segment.filter(v => v > 0);

        let mergedSegment: number[] = [];

        if (filtered.length === 0) {
            mergedSegment = [...segment];
        } else {
            let i = 0;
            while (i < filtered.length) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    const mergedValue = filtered[i] * 2;
                    mergedSegment.push(mergedValue);
                    if (shouldAddScore) addScoreFn(mergedValue);
                    i += 2;
                } else {
                    mergedSegment.push(filtered[i]);
                    i++;
                }
            }

            while (mergedSegment.length < segment.length) {
                mergedSegment.push(0);
            }
        }

        mergedWithFixed.push(...mergedSegment);

        if (endIdx === tiles.length) break;
        mergedWithFixed.push(-1);
        startIdx = endIdx + 1;
    }

    return mergedWithFixed;
}

// 통합된 mergeTiles 함수 (점수 추가 함수 주입)
function mergeTilesGeneric(
    direction: "up" | "down" | "left" | "right" | "w" | "s" | "a" | "d",
    gridRef: number[][],
    tilesProvider: () => { row: number; col: number; value: number }[],
    update: () => void,
    shouldCheckWin: boolean,
    shouldAddScore: boolean,
    addScoreFn: (value: number) => void, // 점수 함수 주입
) {
    const tiles = tilesProvider();

    const vertical =
        direction === "up" || direction === "down" || direction === "w" || direction === "s";
    const reverse =
        direction === "down" || direction === "right" || direction === "s" || direction === "d";

    // 깊은 복사
    const newGrid = gridRef.map(row => [...row]);

    if (vertical) {
        for (let col = 0; col < boardSize; col++) {
            const colTiles = tiles.filter(tile => tile.col === col);
            const rowTiles = colTiles.sort((a, b) => (reverse ? b.row - a.row : a.row - b.row));
            const tileMap = Array(boardSize).fill(0);

            rowTiles.forEach(tile => {
                tileMap[reverse ? boardSize - 1 - tile.row : tile.row] = tile.value;
            });

            const merged = mergeLineWithScore(tileMap, shouldAddScore, addScoreFn);
            for (let row = 0; row < boardSize; row++) {
                newGrid[reverse ? boardSize - 1 - row : row][col] = merged[row];
            }
        }
    } else {
        for (let row = 0; row < boardSize; row++) {
            const rowTiles = tiles.filter(tile => tile.row === row);
            const colTiles = rowTiles.sort((a, b) => (reverse ? b.col - a.col : a.col - b.col));
            const tileMap = Array(boardSize).fill(0);

            colTiles.forEach(tile => {
                tileMap[reverse ? boardSize - 1 - tile.col : tile.col] = tile.value;
            });

            const merged = mergeLineWithScore(tileMap, shouldAddScore, addScoreFn);
            for (let col = 0; col < boardSize; col++) {
                newGrid[row][reverse ? boardSize - 1 - col : col] = merged[col];
            }
        }
    }

    // gridRef에 반영
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            gridRef[i][j] = newGrid[i][j];
        }
    }

    update();
    if (shouldCheckWin) checkWin();
}

// 사용자용: 방향은 up/down/left/right
export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    mergeTilesGeneric(
        direction,
        grid,
        () => tilesSearch(grid),
        updateBoard,
        true,
        true,
        addScore, // 플레이어 점수 함수 주입
    );
}

// AI용: 방향은 w/s/a/d
export function mergeTiles2(direction: "w" | "s" | "a" | "d") {
    mergeTilesGeneric(
        direction,
        grid2,
        () => tilesSearch(grid2),
        updateBoard2,
        false,
        true,
        aiaddScore,
    );
}
// === 자동 이동 기능 ===

let autoMoveInterval: ReturnType<typeof setInterval> | null = null;

function getRandomDirection(): "w" | "s" | "a" | "d" {
    const directions = ["w", "s", "a", "d"] as const;
    return directions[Math.floor(Math.random() * directions.length)];
}

export function startAutoMove() {
    if (autoMoveInterval !== null) return;

    autoMoveInterval = setInterval(() => {
        const direction = getRandomDirection();
        mergeTiles2(direction);
        addRandomCell2();
        if (!canMoveOrMerge2()) {
            checkGameOver2();
        }
    }, 1000);
}

export function stopAutoMove() {
    if (autoMoveInterval !== null) {
        clearInterval(autoMoveInterval);
        autoMoveInterval = null;
    }
}
