/**
 *  @param borad 전체 맵 배열
 *  @param x 현재 위치 x값
 *  @param y 현재 위치 y값
 *  @param dir 현재 방향 값
 */

interface getValue {
    borad: number[][];
    dir: string;
}

// 테스트용
const map: getValue = {
    borad: [
        [8, 4, 4, 0],
        [8, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    dir: "down",
};

export default function findMovetile(value: getValue) {
    const Max = value.borad.length; // 최대 길이

    let same_x = []; // 중복 체크값
    let same_y = []; // 중복 체크값

    // 오른쪽, 왼쪽 , 아래, 위 (y,x 순서)
    const dir = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const dir_str = ["right", "left", "down", "up"];
    const add_y = dir[dir_str.indexOf(value.dir)][0]; // +할 y방향
    const add_x = dir[dir_str.indexOf(value.dir)][1]; // +할 x방향

    // 왼쪽,위쪽만 구현
    if (value.dir === "left" || value.dir === "up") {
        // 모든 블럭 조사
        for (let i = 0; i < Max; i++) {
            for (let j = 0; j < Max; j++) {
                let y = i; // 현재 값 y
                let x = j; // 현재 값 x

                // 현재 값이 0이 아니라면
                if (value.borad[i][j] > 0) {
                    // 여기서 부터 입력 방향 쭉 조사
                    for (let k = 0; k < Max; k++) {
                        y += add_y; // 다음 조사할 y 값
                        x += add_x; // 다음 조사할 x 값

                        // 만약 배열을 넘는다면
                        if (!arrOverCheck(y, x, Max)) {
                            value.borad[y - add_y][x - add_x] = value.borad[i][j];

                            // 끝 부분이 같은지 체크
                            if (!(y - add_y === i && x - add_x === j)) {
                                value.borad[i][j] = 0;
                            }

                            break;
                        }

                        // 옆에 값이 같다면
                        else if (value.borad[i][j] === value.borad[y][x]) {
                            // 만약 이미 한번 더해진 값이 아니라면
                            if (same_y[y] !== 1 && same_x[x] !== 1) {
                                // 바로 값을 2배로 변경한다.
                                value.borad[y][x] += value.borad[y][x];
                                value.borad[i][j] = 0;

                                same_y[y] = 1;
                                same_x[x] = 1;
                            }

                            // 그 전값으로 값을 이동한다
                            else {
                                value.borad[y - add_y][x - add_x] = value.borad[i][j];
                                value.borad[i][j] = 0;
                            }

                            break;
                        }

                        // 옆에 값이 값이 다르다면
                        else if (
                            value.borad[y][x] !== 0 &&
                            value.borad[i][j] !== value.borad[y][x]
                        ) {
                            if (value.borad[y - add_y][x - add_x] === 0) {
                                value.borad[y - add_y][x - add_x] = value.borad[i][j];
                                value.borad[i][j] = 0;
                            }

                            break;
                        }
                    }
                }
            }

            same_y = [];
            same_x = [];
        }
    }

    // 오른쪽,아래만 구현
    if (value.dir === "right" || value.dir === "down") {
        // 모든 블럭 조사
        for (let i = Max - 1; i > -1; i--) {
            for (let j = Max - 1; j > -1; j--) {
                let y = i; // 현재 값 y
                let x = j; // 현재 값 x

                // 현재 값이 0이 아니라면
                if (value.borad[i][j] > 0) {
                    // 여기서 부터 입력 방향 쭉 조사
                    for (let k = 0; k < Max; k++) {
                        y += add_y; // 다음 조사할 y 값
                        x += add_x; // 다음 조사할 x 값

                        // 만약 배열을 넘는다면
                        if (!arrOverCheck(y, x, Max)) {
                            value.borad[y - add_y][x - add_x] = value.borad[i][j];

                            // 끝 부분이 같은지 체크
                            if (!(y - add_y === i && x - add_x === j)) {
                                value.borad[i][j] = 0;
                            }

                            break;
                        }

                        // 옆에 값이 같다면
                        else if (value.borad[i][j] === value.borad[y][x]) {
                            // 만약 이미 한번 더해진 값이 아니라면
                            if (same_y[y] !== 1 && same_x[x] !== 1) {
                                value.borad[y][x] += value.borad[y][x];
                                value.borad[i][j] = 0;

                                same_y[y] = 1;
                                same_x[x] = 1;
                            }

                            // 그 전값으로 값을 이동한다
                            else {
                                value.borad[y - add_y][x - add_x] = value.borad[i][j];
                                value.borad[i][j] = 0;
                            }

                            break;
                        }

                        // 옆에 값이 값이 다르다면
                        else if (
                            value.borad[y][x] !== 0 &&
                            value.borad[i][j] !== value.borad[y][x]
                        ) {
                            if (value.borad[y - add_y][x - add_x] === 0) {
                                value.borad[y - add_y][x - add_x] = value.borad[i][j];
                                value.borad[i][j] = 0;
                            }

                            break;
                        }
                    }
                }
            }

            same_y = [];
            same_x = [];
        }
    }

    console.log(value.borad);
}

// 배열 초과 함수
function arrOverCheck(y: number, x: number, max: number): boolean {
    if (x < 0 || y < 0 || x > max - 1 || y > max - 1) return false;
    else return true;
}

findMovetile(map);
