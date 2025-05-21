import soundOn from "../svg/sound-on.svg";
//배경음악
const bgm = new Audio("/sound/bgm.mp4");
bgm.loop = true;
bgm.volume = 0.5;
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
// 슬라이더 요소
const masterVolumeSlider = document.getElementById("master-volume") as HTMLInputElement;

// 초기 볼륨 설정
const initialVolume = parseInt(masterVolumeSlider.value) / 100;
bgm.volume = initialVolume;
clickSound.volume = initialVolume;

// 이벤트 리스너로 전체 볼륨 조절
masterVolumeSlider.addEventListener("input", () => {
    const volume = parseInt(masterVolumeSlider.value) / 100;
    bgm.volume = volume;
    clickSound.volume = volume;

    // 음소거 상태에서 슬라이더 조작 시 자동 재생
    if (bgm.paused && volume > 0) {
        playBGM();
        const bgmIcon = document.getElementById("bgm-icon") as HTMLImageElement;
        if (bgmIcon) {
            bgmIcon.src = soundOn;
        }
    }
});
// 저장
masterVolumeSlider.addEventListener("change", () => {
    localStorage.setItem("masterVolume", masterVolumeSlider.value);
});

// 복원
const savedVolume = localStorage.getItem("masterVolume");
if (savedVolume) {
    masterVolumeSlider.value = savedVolume;
    const volume = parseInt(savedVolume) / 100;
    bgm.volume = volume;
    clickSound.volume = volume;
}
