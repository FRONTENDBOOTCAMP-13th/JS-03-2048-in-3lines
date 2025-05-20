const CURRENT_SCORE = "currentScore"; //현재점수
const BEST_SCORE = "bestScore"; //최고점수
//현재점수 초기화
export function resetScore() {
    localStorage.setItem(CURRENT_SCORE, "0");
    renderScores();
}
//점수 추가
export function addScore(points: number) {
    const current = getCurrentScore() + points;
    localStorage.setItem(CURRENT_SCORE, current.toString());
    //최고점수 갱신
    const best = getBestScore();
    if (current > best) {
        localStorage.setItem(BEST_SCORE, current.toString());
    }
    //점수 표시
    renderScores();
}
//현재점수 로컬로 가져오기
export function getCurrentScore(): number {
    return parseInt(localStorage.getItem(CURRENT_SCORE) || "0", 10);
}
//최고점수 로컬로 가져오기
export function getBestScore(): number {
    return parseInt(localStorage.getItem(BEST_SCORE) || "0", 10);
}
//점수 표시
export function renderScores() {
    const scoreEl = document.getElementById("score");
    const besttodayEl = document.getElementById("best-today");
    const besttotalEl = document.getElementById("best-total");
    const besttodaymobEl = document.getElementById("best-today-mob");
    const besttotalmobEl = document.getElementById("best-total-mob");

    if (scoreEl) scoreEl.textContent = getCurrentScore().toString();
    if (besttodayEl) besttodayEl.textContent = getBestScore().toString();
    if (besttotalEl) besttotalEl.textContent = getBestScore().toString();
    if (besttodaymobEl) besttodaymobEl.textContent = getBestScore().toString();
    if (besttotalmobEl) besttotalmobEl.textContent = getBestScore().toString();
}
