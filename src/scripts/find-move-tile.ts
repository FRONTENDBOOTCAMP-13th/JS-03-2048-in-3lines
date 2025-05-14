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
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0],
        [4, 0, 0, 0, 0],
        [6, 0, 0, 0, 0],
    ],
    dir: "down",
};

export default function findMovetile(value: getValue) {
    const Max = value.borad.length; // 최대 길이

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

    let move_arr: number[][] = []; // 최종 반환 값
    let borad = map.borad.map(row => row.slice()); // 전체 맵 복제

    // 왼쪽,위쪽만 구현
    if (value.dir === "left" || value.dir === "up") {
        // 모든 블럭 조사
        for (let i = 0; i < Max; i++) {
            for (let j = 0; j < Max; j++) {
                let y = i; // 현재 값 y
                let x = j; // 현재 값 x

                Condition(borad, i, j, y, x, Max, add_y, add_x, move_arr);
            }
        }
    }

    // 오른쪽,아래만 구현
    if (value.dir === "right" || value.dir === "down") {
        // 모든 블럭 조사
        for (let i = Max - 1; i > -1; i--) {
            for (let j = Max - 1; j > -1; j--) {
                let y = i; // 현재 값 y
                let x = j; // 현재 값 x

                Condition(borad, i, j, y, x, Max, add_y, add_x, move_arr);
            }
        }
    }

    // 테스트용
    console.log(borad, move_arr);
    return move_arr;
}

// 배열 초과 함수
function arrOverCheck(y: number, x: number, max: number): boolean {
    if (x < 0 || y < 0 || x > max - 1 || y > max - 1) return false;
    else return true;
}

function Condition(
    borad: number[][],
    i: number,
    j: number,
    y: number,
    x: number,
    Max: number,
    add_y: number,
    add_x: number,
    move_arr: number[][],
) {
    // 현재 값이 0이 아니라면 (조건 탐색 시작)
    if (borad[i][j] > 0) {
        // 여기서 부터 입력 방향 쭉 조사
        for (let k = 0; k < Max; k++) {
            y += add_y; // 다음 조사할 y 값
            x += add_x; // 다음 조사할 x 값

            // 만약 배열을 넘는다면 , 마지막 부분인지 체크한다.
            if (!arrOverCheck(y, x, Max)) {
                console.log(`1. 현재 위치는`, i, j, " 이동해야할 위치는 ", y - add_y, x - add_x);
                move_arr.push([i, j, (y -= add_y), (x -= add_x)]);
                break;
            }

            // 옆으로 이동시 숫자가 같다면, 옆이 같은 경우 , 현재 값이 0이 아니기 때문에 0 조건을 추가할 필요는 없을듯
            else if (borad[y][x] === borad[i][j]) {
                console.log(`2. 현재 위치는`, i, j, " 이동해야할 위치는 ", y, x);
                borad[i][j] = 0; // 현재 위치 초기화
                move_arr.push([i, j, y, x]);
                break;
            }

            // 옆으로 이동시 값이 같지 않다면
            else if (borad[y][x] !== borad[i][j] && borad[y][x] !== 0) {
                console.log(`3. 현재 위치는`, i, j, " 이동해야할 위치는 ", y - add_y, x - add_x);
                borad[(y -= add_y)][(x -= add_x)] = borad[i][j];

                // 바로 옆인지 확인
                if (y !== i || x !== j) {
                    borad[i][j] = 0; // 현재 위치 초기화
                }

                move_arr.push([i, j, y, x]);
                break;
            }
        }
    }
}

findMovetile(map);
