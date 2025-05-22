const CURRENT_SCORE = "currentScore"; // 현재 점수
const BEST_SCORE_TOTAL = "bestScoreTotal"; // 전체 최고 점수
const BEST_SCORE_TODAY = "bestScoreToday"; // 오늘 최고 점수
const BEST_SCORE_TODAY_DATE = "bestScoreTodayDate"; // 오늘 최고 점수 저장한 날짜 (yyyyMMdd)
const AI_SCORE = "aiScore"; //ai점수

// 날짜를 'yyyyMMdd' 형태로 반환하는 함수
function getTodayString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
}

// 오늘 최고 점수 초기화 체크 및 초기화 함수
function checkAndResetTodayBestScore() {
    const savedDate = localStorage.getItem(BEST_SCORE_TODAY_DATE);
    const today = getTodayString();
    if (savedDate !== today) {
        // 날짜가 다르면 오늘 최고 점수 초기화
        localStorage.setItem(BEST_SCORE_TODAY, "0");
        localStorage.setItem(BEST_SCORE_TODAY_DATE, today);
    }
}

// 현재 점수 초기화
export function resetScore() {
    localStorage.setItem(CURRENT_SCORE, "0");
    localStorage.setItem(AI_SCORE, "0");
    checkAndResetTodayBestScore();
    renderScores();
}

// 점수 추가
export function addScore(points: number) {
    checkAndResetTodayBestScore();

    const current = getCurrentScore() + points;
    localStorage.setItem(CURRENT_SCORE, current.toString());

    // 오늘 최고 점수 갱신
    const bestToday = getBestScoreToday();
    if (current > bestToday) {
        localStorage.setItem(BEST_SCORE_TODAY, current.toString());
        localStorage.setItem(BEST_SCORE_TODAY_DATE, getTodayString());
    }

    // 전체 최고 점수 갱신
    const bestTotal = getBestScoreTotal();
    if (current > bestTotal) {
        localStorage.setItem(BEST_SCORE_TOTAL, current.toString());
    }

    renderScores();
}

// ai점수 추가
export function aiaddScore(points: number) {
    const current = getaiScore() + points;
    localStorage.setItem(AI_SCORE, current.toString());
    renderScores();
}

// 현재 점수 가져오기
export function getCurrentScore(): number {
    return parseInt(localStorage.getItem(CURRENT_SCORE) || "0", 10);
}

// 오늘 최고 점수 가져오기
export function getBestScoreToday(): number {
    checkAndResetTodayBestScore();
    return parseInt(localStorage.getItem(BEST_SCORE_TODAY) || "0", 10);
}

//ai 점수 가져오기
export function getaiScore(): number {
    return parseInt(localStorage.getItem(AI_SCORE) || "0", 10);
}

// 전체 최고 점수 가져오기
export function getBestScoreTotal(): number {
    return parseInt(localStorage.getItem(BEST_SCORE_TOTAL) || "0", 10);
}

// 점수 표시
export function renderScores() {
    const scoreEl = document.getElementById("score");
    const aiscoreEl = document.getElementById("ai-score");
    const besttodayEl = document.getElementById("best-today");
    const besttotalEl = document.getElementById("best-total");
    const besttodaymobEl = document.getElementById("best-today-mob");
    const besttotalmobEl = document.getElementById("best-total-mob");

    if (scoreEl) scoreEl.textContent = getCurrentScore().toString();
    if (aiscoreEl) aiscoreEl.textContent = getaiScore().toString();
    if (besttodayEl) besttodayEl.textContent = getBestScoreToday().toString();
    if (besttotalEl) besttotalEl.textContent = getBestScoreTotal().toString();
    if (besttodaymobEl) besttodaymobEl.textContent = getBestScoreToday().toString();
    if (besttotalmobEl) besttotalmobEl.textContent = getBestScoreTotal().toString();
}
