// 設計
// ゲームで使用する変数設定

const WHITE = -1;
const BLACK = 1;
let dataArray;
let turn = 1;
let player = [WHITE, BLACK];


// ゲームスタート
window.onload = () => {
    game();
}

// 配列を作成しレンダリングする
const game = () => {
    dataArray = createDataArray();
    console.log(dataArray);
    renderData(dataArray);
}

// プレイヤーを返す関数
const whichPlayer = () => {
    return player[turn % 2];
}

// 2次元配列を作成し石の初期値をセットし返す関数
const createDataArray = () => {
    const baseArray = createBaseArray();

    return initializeDataArray(baseArray);
}

// 2次元配列を作成
const createBaseArray = () => {
    const x = [...Array(8)].map(() => {
        return undefined;
    })
    return x.map(() => {
        return [...Array(8)].map(() => {
            return undefined;
        })
    })
}

// createBaseArrayで作成した配列に石をセットする
const initializeDataArray = (baseArray) => {
    baseArray[3][3] = WHITE;
    baseArray[4][4] = WHITE;
    baseArray[3][4] = BLACK;
    baseArray[4][3] = BLACK;
    return baseArray;
}

// セルクリック時の処理セット関数
function handleCellClick (e)  {
    console.log(this.y)
    console.log(this.x)
    const checked = check(this.y, this.x);
    console.log(checked)
    if (checked.r) {
        dataArray = checked.data;
        turn++;
        renderData(dataArray);
    }
}

// セルを押下した際のロジック
const check = (y, x) => {
    let isReverse = false;
    const current = dataArray[y][x];

    let newDataArray = JSON.parse(JSON.stringify(dataArray));
    if (!current) {
        for (let yIndex = -1; yIndex <=1; yIndex++) {
            if (!validIndex(y + yIndex)) {
                continue;
            }
            for (let xIndex = -1; xIndex <= 1; xIndex++) {
                if (!validIndex(x + xIndex) || (yIndex === 0 && xIndex === 0)) {
                    continue;
                }
                const checkResult = lineReverse(y, yIndex, x, xIndex, newDataArray);
                if (checkResult.r) {
                    newDataArray = checkResult.data;
                    isReverse = true;
                }
            }
        }
    }

    return { r: isReverse, data: newDataArray};
}

// セルのindexチェック
const validIndex = (index) => {
    return 0 <= index && index < 8;
}
// チェックする方向のセルのindexチェック
const allValidIndex = (y, x) => {
    return validIndex(y) && validIndex(x);
}
// 石を返す関数
const lineReverse = (y, yIndex, x, xIndex, newDataArray) => {
    let canReverse = false;
    let cy = y + yIndex;
    let cx = x + xIndex;
    const clist = [];

    if (allValidIndex(cy, cx)) {
        let target = dataArray[cy][cx];
        while(target && target === whichPlayer() * -1) {
            clist.push([cy, cx]);

            cy = cy + yIndex;
            cx = cx + xIndex;
            target = dataArray[cy][cx];
            canReverse = true;
        }

        // TODO:ここから
        if (canReverse && dataArray[cy][cx] === whichPlayer()) {
            clist.push([y, x]);
            clist.map((val) => {
                newDataArray[val[0]][val[1]] = whichPlayer();
            });
            return { r: true, data: newDataArray };
        }
    }

    return { r: false, data: [] };
}

// 盤面を生成する
const renderData = (dataArray) => {
    const main = document.getElementById('main');
    allRemove(main);

    dataArray.forEach((y, yIndex) => {
        const div1 = document.createElement("div");
        div1.classList.add("tr");
        y.forEach((x, xIndex) => {
            const div2 = document.createElement("div");
            div2.classList.add("td");
            if (x) {
                div2.innerHTML = x === 1 ? "○" : "●";
            }

            div2.addEventListener("click", {
                x: xIndex,
                y: yIndex,
                handleEvent: handleCellClick,
            });
            div1.appendChild(div2);
        });
        main.appendChild(div1);
    });

    const info = document.getElementById('info');
    let text;
    const currentPlayer = whichPlayer();
    if (currentPlayer === 1) {
        text = '白';
    } else if (currentPlayer === -1) {
        text = '黒';
    }
    info.innerHTML = text + 'のターン';
}

// 盤面のDOMノードの子ノードを全て削除する
const allRemove = (node) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}