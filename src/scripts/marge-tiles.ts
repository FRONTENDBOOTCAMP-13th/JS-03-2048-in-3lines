import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard } from "./board";
import { addScore } from "./score";

// 공통 병합 함수
function mergeLine(tiles: number[]): number[] {
    const merged: number[] = [];
    let i = 0;
    while (i < tiles.length) {
        if (i < tiles.length - 1 && tiles[i] === tiles[i + 1]) {
            merged.push(tiles[i] * 2);
            addScore(tiles[i] * 2);
            i += 2;
        } else {
            merged.push(tiles[i]);
            i++;
        }
    }
    return merged;
}

export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    if (direction === "up") {
        for (let col = 0; col < boardSize; col++) {
            let colTiles = [];
            for (let row = 0; row < boardSize; row++) {
                if (grid[row][col] !== 0) colTiles.push(grid[row][col]);
            }
            colTiles = mergeLine(colTiles);
            for (let row = 0; row < boardSize; row++) {
                grid[row][col] = colTiles[row] || 0;
            }
        }
    }

    if (direction === "down") {
        for (let col = 0; col < boardSize; col++) {
            let colTiles = [];
            for (let row = boardSize - 1; row >= 0; row--) {
                if (grid[row][col] !== 0) colTiles.push(grid[row][col]);
            }
            colTiles = mergeLine(colTiles);
            for (let row = 0; row < boardSize; row++) {
                grid[boardSize - 1 - row][col] = colTiles[row] || 0;
            }
        }
    }

    if (direction === "left") {
        for (let row = 0; row < boardSize; row++) {
            let rowTiles = grid[row].filter(v => v !== 0);
            rowTiles = mergeLine(rowTiles);
            grid[row] = [...rowTiles, ...Array(boardSize - rowTiles.length).fill(0)];
        }
    }

    if (direction === "right") {
        for (let row = 0; row < boardSize; row++) {
            let rowTiles = grid[row].filter(v => v !== 0).reverse();
            rowTiles = mergeLine(rowTiles);
            grid[row] = [...Array(boardSize - rowTiles.length).fill(0), ...rowTiles.reverse()];
        }
    }

    setTimeout(updateBoard, 100);
}
