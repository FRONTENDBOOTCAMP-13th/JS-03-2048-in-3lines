// 키보드 입력 처리
document.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.key) {
        case "ArrowUp":
            //move("up");
            break;
        case "ArrowDown":
            //move("down");
            break;
        case "ArrowLeft":
            //move("left");
            break;
        case "ArrowRight":
            //move("right");
            break;
    }
});

// 이동 방향 타입
type Direction = "up" | "down" | "left" | "right";
