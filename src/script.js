const boardSize = 4; //보드크기(난이도에따라 변경)
const board = document.getElementById("board"); //보드요소

//보드 css(js 지정용)
board.style.display = "grid";

//보드크기에따라 크기변경
board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

//배열(초기값:0)
const grid = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

//보드 업데이트
function UpdateBoard() {
    board.innerHTML = ""; //초기화
    //보드사이즈만큼 반복
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            board.appendChild(cell);
            const value = grid[row][col]; //셀의 배열
            //빈셀이 아니면 값 표시및 색상변경
            if (value !== 0) {
                cell.textContent = value; // 숫자
                cell.dataset.value = value; // 숫자의 data-valu속성(css용)
            }
            board.appendChild(cell); //셀 추가
        }
    }
    //점수계산
    //게임오버 판별(이동시켜 병합할수있는 셀이 없을때 게임오버=>점수확인후 최고점수이면 최고점수값 변경)
    //로컬로 현재진행상태 저장(현재 배열값,점수,최고점수등)
}

//비어있는셀에 2추가
function addRandomcell() {
    const emptyCells = []; // 비어있는셀 좌표 배열
    // 비어있는셀 확인
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col }); // 비어있는셀 위치
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

//키보드 방향키 입력 처리
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") move("up");
    else if (event.key === "ArrowDown") move("down");
    else if (event.key === "ArrowLeft") move("left");
    else if (event.key === "ArrowRight") move("right");
});

//병합 로직
function mergeTiles() {
    //이동방향에따라 이동후 앞에값확인
    //값이 현재값과 같으면 병합 아니면 현재 상태유지(앞에셀과 현재셀 삭제후 앞에 현재값의*2값의셀 생성)
    //스코어계산
}

//이동 로직
function move(direction) {
    //이동전 배열(실행 취소용)(현재값 저장)
    //이동후 배열(실행 취소용)
    switch (direction) {
        case "up":
            //위로 이동시키는 로직
            //배열의 col의 비어있는데까지 -이동(row는 유지)
            //병합 로직
            break;
        case "down":
            //아래로 이동시키는 로직
            //배열의 col의 비어있는데까지 +이동(row는 유지)
            //병합 로직
            break;
        case "left":
            //왼쪽으로 이동시키는 로직
            //배열의 row의 비어있는데까지 -이동(col은 유지)
            //병합 로직
            break;
        case "right":
            //오른쪽으로 이동시키는 로직
            //배열의 row의 비어있는데까지 +이동(col은 유지)
            //병합 로직
            break;
    }
    //이동후 배열에 핸재값 저장
    //보드 업데이트(이전 배열과 비교해서 변화가 있으면 빈배열에 2추가및 보드 재생성)
}

//실행취소
function reverseTiles() {
    //현재배열에 이동전 배열의 값으로 변경후 재생성
}

//난이도 선택 로직
function changelevel() {
    //클릭시 난이도 표시
    //난이도 클릭시 해당 크기로 변경후 재시작
}

//초기화(지금은 페이지 새로고침 +배열값 초기화 추가시 재시작 로직)
addRandomcell(); //보드배열에 2추가
addRandomcell(); //보드배열에 2추가
UpdateBoard(); //보드배열 생성
