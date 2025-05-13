const startBtn = document.getElementById("start-btn") as HTMLButtonElement; // 게임 시작 버튼
// 시작 버튼 클릭 시 게임 화면 표시 및 초기화
startBtn.addEventListener("click", () => {
    const startContainer = document.getElementById("start-container") as HTMLElement;
    const gameContainer = document.getElementById("game-container") as HTMLElement;
    startContainer.style.display = "none";
    gameContainer.style.display = "block";
    //initGrid();
});
