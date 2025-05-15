import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard } from "./board";
import { addScore } from "./score";

export function mergeTiles(direction: "up" | "down" | "left" | "right") {
    if (direction === "up") {
        for (let col = 0; col < boardSize; col++) {
            let colTiles = [];
            for (let row = 0; row < boardSize; row++) {
                if (grid[row][col] !== 0) {
                    colTiles.push(grid[row][col]);
                }
            }
            for (let i = 0; i < colTiles.length - 1; i++) {
                if (colTiles[i] === colTiles[i + 1]) {
                    colTiles[i] *= 2;
                    colTiles[i + 1] = 0;
                    addScore(colTiles[i]); // 점수 추가

                    // 병합된 타일에 클래스를 추가
                    const tileElement = document.querySelector(
                        `[data-row="${i}"][data-col="${col}"]`,
                    );
                    if (tileElement) {
                        tileElement.classList.add("jello-vertical");
                        setTimeout(() => tileElement.classList.remove("jello-vertical"), 600); // 애니메이션 제거
                    }
                }
            }
            colTiles = colTiles.filter(tile => tile !== 0);
            while (colTiles.length < boardSize) {
                colTiles.push(0); // 부족한 길이를 0으로 채움
            }
            for (let row = 0; row < boardSize; row++) {
                grid[row][col] = colTiles[row];
            }
        }
    }

    if (direction === "down") {
        for (let col = 0; col < boardSize; col++) {
            let colTiles = [];
            for (let row = 0; row < boardSize; row++) {
                if (grid[row][col] !== 0) {
                    colTiles.push(grid[row][col]);
                }
            }
            for (let i = 0; i < colTiles.length - 1; i++) {
                if (colTiles[i] === colTiles[i + 1]) {
                    colTiles[i] *= 2;
                    colTiles[i + 1] = 0;
                    addScore(colTiles[i]); // 점수 추가

                    // 병합된 타일에 클래스를 추가
                    const tileElement = document.querySelector(
                        `[data-row="${i}"][data-col="${col}"]`,
                    );
                    if (tileElement) {
                        tileElement.classList.add("jello-vertical");
                        setTimeout(() => tileElement.classList.remove("jello-vertical"), 600); // 애니메이션 제거
                    }
                }
            }
            colTiles = colTiles.filter(tile => tile !== 0);
            while (colTiles.length < boardSize) {
                colTiles.push(0); // 부족한 길이를 0으로 채움
            }
            for (let row = boardSize - 1, i = 0; row >= 0; row--, i++) {
                // row는 아래에서 위로가 맞지만 colTiles를 row의 값으로하면 맨 아래의 값을 넣어야 하므로
                // colTiles는 인덱스 번호의 순서에따라서 넣어야 하므로
                // colTiles[i]는 0에서 증가해야 하므로 i를 사용
                grid[row][col] = colTiles[i];
            }
        }
    }

    if (direction === "left") {
        for (let row = 0; row < boardSize; row++) {
            let rowTiles = [];
            for (let col = 0; col < boardSize; col++) {
                if (grid[row][col] !== 0) {
                    rowTiles.push(grid[row][col]);
                }
            }
            for (let i = 0; i < rowTiles.length - 1; i++) {
                if (rowTiles[i] === rowTiles[i + 1]) {
                    rowTiles[i] *= 2;
                    rowTiles[i + 1] = 0;
                    addScore(rowTiles[i]); // 점수 추가

                    // 병합된 타일에 클래스를 추가
                    const tileElement = document.querySelector(
                        `[data-row="${row}"][data-col="${i}"]`,
                    );
                    if (tileElement) {
                        tileElement.classList.add("jello-horizontal");
                        setTimeout(() => tileElement.classList.remove("jello-horizontal"), 600); // 애니메이션 제거
                    }
                }
            }
            rowTiles = rowTiles.filter(tile => tile !== 0);
            while (rowTiles.length < boardSize) {
                rowTiles.push(0); // 부족한 길이를 0으로 채움
            }
            for (let col = 0; col < boardSize; col++) {
                grid[row][col] = rowTiles[col];
            }
        }
    }
    if (direction === "right") {
        for (let row = 0; row < boardSize; row++) {
            let rowTiles = [];
            for (let col = 0; col < boardSize; col++) {
                if (grid[row][col] !== 0) {
                    rowTiles.push(grid[row][col]);
                }
            }
            for (let i = 0; i < rowTiles.length - 1; i++) {
                if (rowTiles[i] === rowTiles[i + 1]) {
                    rowTiles[i] *= 2;
                    rowTiles[i + 1] = 0;
                    addScore(rowTiles[i]); // 점수 추가
                    // 병합된 타일에 클래스를 추가
                    const tileElement = document.querySelector(
                        `[data-row="${row}"][data-col="${i}"]`,
                    );
                    if (tileElement) {
                        tileElement.classList.add("jello-horizontal");
                        setTimeout(() => tileElement.classList.remove("jello-horizontal"), 600); // 애니메이션 제거
                    }
                }
            }
            rowTiles = rowTiles.filter(tile => tile !== 0);
            while (rowTiles.length < boardSize) {
                rowTiles.push(0); // 부족한 길이를 0으로 채움
            }
            for (let col = boardSize - 1, i = 0; col >= 0; col--, i++) {
                grid[row][col] = rowTiles[i];
            }
        }
    }
    // 화면 업데이트
    updateBoard();
}
