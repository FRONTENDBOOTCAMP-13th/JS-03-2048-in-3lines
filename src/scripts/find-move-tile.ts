/* 단일 책임의 원칙을 준수할 것! */

// // 테스트용
// const map: getValue = {
//     borad: [
//         [2, 3, 0, 3, 6],
//         [0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0],
//     ],
//     dir: "left",
// };

// findMovetile(map);

export function findMovetile(map: number[][], dir: string): number[][] {
    if (dir !== "right" && dir !== "left" && dir !== "up" && dir !== "down") return [];

    const Max = map.length; // 최대 길이
    const add_dir = setDirection(dir); // 이동 방향
    const Borad = map.map(row => [...row]);
    let MergeCheck: number[][] = []; // 현재 위치에 값이 더해 졌는지 확인
    let MoveArr: number[][] = []; // 최종 반환값

    // 왼쪽,위
    if (dir === "left" || dir === "up") {
        for (let y = 0; y < Max; y++) {
            for (let x = 0; x < Max; x++) {
                const NowValue = Borad[y][x];
                const NowLocation = [y, x];

                // 현재 값이 0이 아니라면
                if (NowValue > 0) {
                    moveConditions(NowLocation, add_dir, Max, Borad, MoveArr, MergeCheck);
                }
            }
        }
    }

    // 오른쪽, 아래
    else {
        for (let y = Max - 1; y > -1; y--) {
            for (let x = Max - 1; x > -1; x--) {
                const NowValue = Borad[y][x];
                const NowLocation = [y, x];

                // 현재 값이 0이 아니라면
                if (NowValue > 0) {
                    moveConditions(NowLocation, add_dir, Max, Borad, MoveArr, MergeCheck);
                }
            }
        }
    }

    // 테스트용
    console.log("전체 맵", Borad);
    //console.log("이동 위치", MoveArr);
    //console.log(MergeCheck);
    return MoveArr;
}

// 이동 조건
function moveConditions(
    NowLocation: number[],
    add_dir: number[],
    Max: number,
    Borad: number[][],
    MoveArr: number[][],
    MergeCheck: number[][],
) {
    // 다음 위치
    let NextArr = [NowLocation[0] + add_dir[0], NowLocation[1] + add_dir[1]];
    const NowArr = [NowLocation[0], NowLocation[1]];
    const NowValue = Borad[NowLocation[0]][NowLocation[1]];
    let LastMove = true;

    for (let dir = 0; dir < Max; dir++) {
        // 다음 위치가 배열을 초과하지 않는다면
        if (!arrOverCheck(NextArr[0], NextArr[1], Max)) {
            // 옆으로 탐색 가능 시점

            // 탐색 위치에 다른 값이 있다면
            if (Borad[NextArr[0]][NextArr[1]] !== 0) {
                // 마지막 이동 조건 비활성화
                LastMove = false;

                // 탐색 위치의 값 != 현재 값
                if (NowValue !== Borad[NextArr[0]][NextArr[1]]) {
                    Borad[NowArr[0]][NowArr[1]] = 0;
                    Borad[NextArr[0] - add_dir[0]][NextArr[1] - add_dir[1]] = NowValue;
                    MoveArr.push([
                        NowArr[0],
                        NowArr[1],
                        NextArr[0] - add_dir[0],
                        NextArr[1] - add_dir[1],
                    ]);
                    break;
                }

                // 탐색 위치의 값 == 현재 값
                else if (NowValue === Borad[NextArr[0]][NextArr[1]]) {
                    // 값 변경 위치에 배열이 병합된적 있을 경우
                    if (MergeSetting(MergeCheck, NextArr)) {
                        Borad[NowArr[0]][NowArr[1]] = 0;
                        Borad[NextArr[0] - add_dir[0]][NextArr[1] - add_dir[1]] = NowValue;
                        // 여기서 3번째 4를 -> 2번째로 옮김
                        MoveArr.push([
                            NowArr[0],
                            NowArr[1],
                            NextArr[0] - add_dir[0],
                            NextArr[1] - add_dir[1],
                        ]);
                    }
                    // 값 변경 위치에 배열이 병합된적 없을 경우
                    else {
                        Borad[NowArr[0]][NowArr[1]] = 0;
                        Borad[NextArr[0]][NextArr[1]] *= 2;
                        MergeCheck.push([NextArr[0], NextArr[1]]);
                        MoveArr.push([NowArr[0], NowArr[1], NextArr[0], NextArr[1]]);
                    }

                    break;
                }
            }
        }

        // 배열 초과
        else {
            // 탐색 방향에 있는 값이 모두 0이라면
            if (LastMove) {
                Borad[NowArr[0]][NowArr[1]] = 0;
                Borad[NextArr[0] - add_dir[0]][NextArr[1] - add_dir[1]] = NowValue;
                MoveArr.push([
                    NowArr[0],
                    NowArr[1],
                    NextArr[0] - add_dir[0],
                    NextArr[1] - add_dir[1],
                ]);
            }

            break;
        }

        // 다음 위치 세팅
        NextArr[0] = NextArr[0] + add_dir[0];
        NextArr[1] = NextArr[1] + add_dir[1];
    }
}

// 이동 방향 세팅
function setDirection(dir: string) {
    const txtArr = ["right", "left", "down", "up"];
    const dirArr = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    return [dirArr[txtArr.indexOf(dir)][0], dirArr[txtArr.indexOf(dir)][1]];
}

// 배열 초과 감지
function arrOverCheck(y: number, x: number, max: number): boolean {
    if (x < 0 || y < 0 || x > max - 1 || y > max - 1) return true;
    else return false;
}

// 배열 병합 확인
function MergeSetting(Merge: number[][], NextArr: number[]) {
    // true이면 그 자리에 배열이 병합된적 있음
    for (let i = 0; i < Merge.length; i++) {
        if (Merge[i][0] == NextArr[0] && Merge[i][1] == NextArr[1]) {
            return true;
        }
    }

    return false;
}
