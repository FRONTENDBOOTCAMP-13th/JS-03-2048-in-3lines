import "./style.css";
import "./scripts/find-move-tile";
import { setupBoard } from "./scripts/board";
import { startGame, restartGame, home } from "./scripts/game-start";
import { playClickSound, stopBGM, playBGM } from "./scripts/audio";
import { addScore, getCurrentScore, getBestScore } from "./scripts/score";
//보드생성
setupBoard();
//시작버튼
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
startBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    startGame();
});
//재시작 버튼
/*const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
restartBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    restartGame();
});*/
//홈 버튼
/*const homeBtn = document.getElementById("home-btn") as HTMLButtonElement;
homeBtn.addEventListener("click", () => {
    playClickSound(); //클릭 사운드
    home();
});*/
// 콘솔 테스트용
(window as any).score = {
    add: addScore, // 점수 추가: ex)score.add(10)=>10점추가
    current: getCurrentScore, //현재 점수 확인
    best: getBestScore, //최고 점수 확인
};
(window as any).audio = {
    play: playBGM, // 노래재생
    stop: stopBGM, // 노래정지
};
(window as any).display = {
    home: home, //홈
};
