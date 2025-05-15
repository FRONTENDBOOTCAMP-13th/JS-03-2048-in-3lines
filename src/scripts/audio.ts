//배경음악
const bgm = new Audio("/sound/bgm.mp4");
bgm.loop = true;
bgm.volume = 1;
//클릭/이동 사운드
const clickSound = new Audio("/sound/move,select.mp3");
clickSound.volume = 0.8;
//배경음악 재생
export function playBGM() {
    bgm.currentTime = 0;
    bgm.play();
}
//배경음악 정지
export function stopBGM() {
    bgm.pause();
}
//클릭 사운드 재생
export function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}
//현재 재생여부 확인
export function isBGMPlaying(): boolean {
    return !bgm.paused;
}
