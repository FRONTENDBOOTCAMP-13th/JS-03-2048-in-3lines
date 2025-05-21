import { addRandomCell2, grid, grid2 } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard, updateBoard2 } from "./board";
import { addScore, aiaddScore } from "./score"; // aiaddScore 추가 임포트
import { tilesSearch } from "./grid-cell-verification-logic";
import { checkWin } from "./game-win";
import { canMoveOrMerge2 } from "./can-move";
import { checkGameOver2 } from "./game-over";
import { findMovetile, moveAniElement } from "./find-move-tile";

// 공통 mergeLine 함수: 1차원 배열에서 병합 처리 및 점수 계산
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

// 공통 merge 함수 (방향, 그리드 참조, 점수 함수 등 인자화)
function mergeTilesGeneric(
    direction: "up" | "down" | "left" | "right" | "w" | "s" | "a" | "d",
    gridRef: number[][],
    tilesProvider: () => { row: number; col: number; value: number }[],
    update: () => void,
    shouldCheckWin: boolean,
    shouldAddScore: boolean,
    addScoreFn: (value: number) => void,
) {
    const tiles = tilesProvider();
    const vertical =
        direction === "up" || direction === "down" || direction === "w" || direction === "s";
    const reverse =
        direction === "down" || direction === "right" || direction === "s" || direction === "d";
    const newGrid = gridRef.map(row => [...row]);

    // 애니메이션 처리(사용자 입력 방향일 때)
    if (direction === "w" || direction === "a" || direction === "s" || direction === "d") {
        findMovetile(direction, true);
        const boardElement = document.getElementById("board");
        const div = boardElement?.querySelector(".box") as HTMLDivElement;
        if (!boardElement) return;

        moveAniElement(
            direction,
            parseFloat(getComputedStyle(div).width) +
                parseFloat(getComputedStyle(boardElement).gap),
            true,
        );
    }

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

    // 새로운 상태로 gridRef 업데이트
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            gridRef[i][j] = newGrid[i][j];
        }
    }

    // 업데이트 및 승리 체크 (애니메이션 딜레이 포함)
    if (direction === "w" || direction === "a" || direction === "s" || direction === "d") {
        setTimeout(() => {
            update();
            if (shouldCheckWin) checkWin();
        }, 300);
    } else {
        update();
        if (shouldCheckWin) checkWin();
    }
}

// 사용자용 merge 함수
export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    mergeTilesGeneric(direction, grid, () => tilesSearch(grid), updateBoard, true, true, addScore);
}

// AI용 merge 함수
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

// === AI용: 최적 방향 판단 함수 ===
function getBestDirection(): "w" | "s" | "a" | "d" {
    const directions: ("w" | "s" | "a" | "d")[] = ["w", "s", "a", "d"];
    let bestScore = -Infinity;
    let bestDirection: "w" | "s" | "a" | "d" = "w";

    for (const dir of directions) {
        const clonedGrid = grid2.map(row => [...row]);
        let scoreGained = 0;
        const scoreFn = (val: number) => {
            scoreGained += val;
        };

        mergeTilesGeneric(
            dir,
            clonedGrid,
            () => tilesSearch(clonedGrid),
            () => {},
            false,
            true,
            scoreFn,
        );

        // 움직임이 없는 경우 무시
        const isSame = grid2.every((row, i) => row.every((cell, j) => cell === clonedGrid[i][j]));
        if (isSame) continue;

        // 빈칸 개수와 점수 합산하여 평가
        const emptyCount = clonedGrid.flat().filter(cell => cell === 0).length;
        const evaluation = scoreGained + emptyCount * 10;

        if (evaluation > bestScore) {
            bestScore = evaluation;
            bestDirection = dir;
        }
    }

    return bestDirection;
}

// === 그리드 비교 함수 ===
function gridsAreEqual(gridA: number[][], gridB: number[][]): boolean {
    for (let i = 0; i < gridA.length; i++) {
        for (let j = 0; j < gridA[i].length; j++) {
            if (gridA[i][j] !== gridB[i][j]) return false;
        }
    }
    return true;
}

// === AI 자동 이동 제어 변수 ===
let autoMoveInterval: ReturnType<typeof setInterval> | null = null;

// === AI 자동 이동 시작 ===
export function startAutoMove() {
    if (autoMoveInterval !== null) return;

    autoMoveInterval = setInterval(() => {
        const direction = getBestDirection();

        const prevGrid = grid2.map(row => [...row]);

        mergeTiles2(direction);

        const hasChanged = !gridsAreEqual(prevGrid, grid2);

        if (hasChanged) {
            addRandomCell2();
        }

        if (!canMoveOrMerge2()) {
            checkGameOver2();
            stopAutoMove();
        }
    }, 500); // AI 반응 속도 조절 (ms)
}

// === AI 자동 이동 정지 ===
export function stopAutoMove() {
    if (autoMoveInterval !== null) {
        clearInterval(autoMoveInterval);
        autoMoveInterval = null;
    }
}
