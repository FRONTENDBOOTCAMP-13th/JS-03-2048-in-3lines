function addRandomcell() {
    const emptyCells = []; // 비어있는셀 좌표 배열
    // 비어있는셀 확인
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col }); // 비어있는셀
            }
        }
    }
    //빈셀이있을경우 숫자 추가
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length); // 무작위 셀 선택
        const { row, col } = emptyCells[randomIndex]; //셀 좌표
        grid[row][col] = 2; //숫자 2 삽입
    }
}
