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

// 石クリック時の処理セット関数
const handleCellClick = () => {

}

// セルを押下した際のロジック
const check = () => {

}

// セルのindexチェック
const validIndex = () => {

}
// 全体の？indexチェック
const allValidIndex = () => {

}
// 石を返す関数
const lineReverse = () => {

}

// 盤面を生成する
const renderData = (dataArray) => {
    const main = document.getElementById('main');
    allRemove(main);

    dataArray.forEach((y, yIndex) => {
        const div1 = document.createElement('div');
        div1.classList.add('tr');

        y.forEach((x, xIndex) => {
            const div2 = document.createElement('div');
            div2.classList.add('td');
            if (x) {
                div2.innerHTML = x === 1 ? '○' : '●';
            }

            div2.addEventListener('click', {
                x: xIndex,
                y: yIndex,
                handleEvent: handleCellClick,
            });
            div1.appendChild(div2);
        });
        main.appendChild(div1);
    });
}

// 盤面のDOMノードの子ノードを全て削除する
const allRemove = (node) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}