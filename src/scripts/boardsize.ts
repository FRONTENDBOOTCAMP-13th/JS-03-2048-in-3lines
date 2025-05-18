export let boardSize = 4; // 기본 보드 크기 (4x4)

/**
 * 보드 크기 변경 함수
 * @param size - 새로운 보드 크기 (예: 3, 4, 5)
 */
export function setBoardSize(size: number): void {
    boardSize = size;
}
