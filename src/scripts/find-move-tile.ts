/* 단일 책임의 원칙을 준수할 것! */

let PlusArr: number[][] = [];
let Max: number = 0;
let MoveArr: number[][] = [];

// 이동완료 , 이동 위치, 병합된 위치 반환
export function findMovetile(dir: string) {
    if (dir !== "right" && dir !== "left" && dir !== "up" && dir !== "down") return [];

    const map = getMapArr();
    // const Max = map.length; // 최대 길이
    Max = map.length;
    const add_dir = setDirection(dir); // 이동 방향
    const Borad = map.map(row => [...row]);
    let MergeCheck: number[][] = []; // 현재 위치에 값이 더해 졌는지 확인

    //let PlusArr: number[][] = []; // 병합된 위치(애니메이션 적용)
    PlusArr = [];

    // let MoveArr: number[][] = []; // 이동 전 이동 후 위치
    MoveArr = [];

    // 왼쪽,위
    if (dir === "left" || dir === "up") {
        for (let y = 0; y < Max; y++) {
            for (let x = 0; x < Max; x++) {
                const NowValue = Borad[y][x];
                const NowLocation = [y, x];

                // 현재 값이 0이 아니라면
                if (NowValue > 0) {
                    moveConditions(NowLocation, add_dir, Max, Borad, MoveArr, MergeCheck, PlusArr);
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
                    moveConditions(NowLocation, add_dir, Max, Borad, MoveArr, MergeCheck, PlusArr);
                }
            }
        }
    }

    // 테스트용
    // console.log("원본 맵", map);
    // console.log("이동 완료 맵", Borad);
    // console.log("이동 위치", MoveArr);
    // console.log("병합된 위치", PlusArr);
    // console.log("병합된 div");
    // console.log(MergeCheck);

    let result = {
        MoveEndBord: Borad, // 이동 완료 맵
        MoveLocation: MoveArr, // 이동 위치
        PlusLocation: PlusArr, // 병합된 위치
    };

    // 변경값 체크
    const Same = SameCheck(Max, Borad, map);

    // 변경값이 없을 경우
    if (Same) {
        result.MoveLocation = [];
    }

    return result;
}

// 이동 애니메이션 추가
export function moveAniElement(dir: string, moveLength: number) {
    const divArr = getElement();

    for (let i = 0; i < MoveArr.length; i++) {
        // 이동 시킬 상자
        const div = divArr[MoveArr[i][0] * Max + MoveArr[i][1]];
        div.style.transition = "all 0.5s";

        const [move_y, move_x] = [
            Math.abs(MoveArr[i][2] - MoveArr[i][0]),
            Math.abs(MoveArr[i][3] - MoveArr[i][1]),
        ];

        // 오른쪽
        if (dir === "right") {
            div.style.transform = `translate(${move_x * moveLength}px,0px)`;
        }

        // 왼쪽
        else if (dir === "left") {
            div.style.transform = `translate(${-move_x * moveLength}px,0px)`;
        }

        // 위
        else if (dir === "up") {
            div.style.transform = `translate(0px,${-move_y * moveLength}px)`;
        }

        // 아래
        else if (dir === "down") {
            div.style.transform = `translate(0px,${move_y * moveLength}px)`;
        }
    }
}

// 버그로 인한 비활성화 함
// 병합된 div 요소 찾아서 애니메이션 클래스 추가
export function AniElement(dir: string) {
    const divArr = getElement();
    for (let i = 0; i < PlusArr.length; i++) {
        const div = divArr[PlusArr[i][0] * Max + PlusArr[i][1]];

        if (dir === "right" || dir === "left") {
            div.classList.add("jello-horizontal");
        } else {
            div.classList.add("jello-vertical");
        }
    }
}

// 2차원 배열로 변환하는 함수
function getMapArr() {
    const elementArr = getElement();

    let length = 0;

    // 각 한뼘의 길이 구하기
    for (let i = 0; i < elementArr.length; i++) {
        if (i * i === elementArr.length) {
            length = i;
            break;
        }
    }

    let Arr: number[][] = Array.from({ length: length }, () => new Array(length).fill(0));

    elementArr.forEach((item, index) => {
        const value = item.dataset.value;
        let number = 0;

        if (value !== undefined) {
            number = parseInt(value);
        }

        Arr[Math.floor(index / length)][Math.floor(index % length)] = number;
    });

    // 현재 맵 배열을 반환
    return Arr;
}

// div 요소 찾아서 배열로 반환하는 것
function getElement() {
    const element = document.querySelectorAll("#board .cell");
    const elementArr = Array.from(element);

    return elementArr;
}

// 이동 조건
function moveConditions(
    NowLocation: number[],
    add_dir: number[],
    Max: number,
    Borad: number[][],
    MoveArr: number[][],
    MergeCheck: number[][],
    PlusArr: number[][],
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
                        // 여기서 배열 병합
                        Borad[NowArr[0]][NowArr[1]] = 0;
                        Borad[NextArr[0]][NextArr[1]] *= 2;
                        MergeCheck.push([NextArr[0], NextArr[1]]);
                        MoveArr.push([NowArr[0], NowArr[1], NextArr[0], NextArr[1]]);
                        PlusArr.push([NextArr[0], NextArr[1]]);
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

// 변경값 체크
function SameCheck(Max: number, Borad: number[][], map: number[][]) {
    let Same = true;

    for (let y = 0; y < Max; y++) {
        for (let x = 0; x < Max; x++) {
            if (Borad[y][x] !== map[y][x]) {
                Same = false;
                break;
            }
        }
    }

    return Same;
}
