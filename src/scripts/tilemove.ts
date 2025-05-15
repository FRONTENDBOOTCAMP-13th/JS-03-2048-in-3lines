export function MoveTile(data: number[][], elements: HTMLDivElement[], Length: number) {
    for (let i = 0; i < data.length; i++) {
        const [now_y, now_x, next_y, next_x] = [data[i][0], data[i][1], data[i][2], data[i][3]];

        const nowDiv = elements[now_y * Length + now_x];
        const nextDiv = elements[next_y * Length + next_x];

        // 다음 위치에 현재 위치정보 할당
        //nextDiv.textContent = nowDiv.textContent;

        if (now_y !== next_y || now_x !== next_x) {
            const color = getComputedStyle(nextDiv).backgroundColor;
            nextDiv.style.backgroundColor = getComputedStyle(nowDiv).backgroundColor;
            nowDiv.style.backgroundColor = color;
            nowDiv.textContent = "";
        }
    }
}
