import { grid, grid2 } from "./add-random-cell";
import { boardSize } from "./boardsize";

/**
 * 이동 또는 병합 가능한 타일이 있는지 확인
 * @returns boolean - 가능하면 true, 불가능하면 false (게임 오버 조건)
 */
export function canMoveOrMerge(): boolean {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const current = grid[row][col];

            if (current === 0) return true; // 빈 칸 있음

            // 오른쪽 비교
            if (col < boardSize - 1 && grid[row][col + 1] === current) {
                return true;
            }
            // 아래쪽 비교
            if (row < boardSize - 1 && grid[row + 1][col] === current) {
                return true;
            }
        }
    }
    return false; // 이동/병합 불가능
}
export function canMoveOrMerge2(): boolean {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const current = grid2[row][col];

            if (current === 0) return true; // 빈 칸 있음

            // 오른쪽 비교
            if (col < boardSize - 1 && grid2[row][col + 1] === current) {
                return true;
            }
            // 아래쪽 비교
            if (row < boardSize - 1 && grid2[row + 1][col] === current) {
                return true;
            }
        }
    }
    return false; // 이동/병합 불가능
}
