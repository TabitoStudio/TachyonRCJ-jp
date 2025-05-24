const puzzleContainer = document.querySelector('.puzzle-container');
const solveBtn = document.getElementById('solve-btn');
const imagePaths = [
    '../assets/image/game/1.png','../assets/image/game/2.png','../assets/image/game/3.png','../assets/image/game/4.png',
    '../assets/image/game/5.png','../assets/image/game/6.png','../assets/image/game/7.png','../assets/image/game/8.png',
    '../assets/image/game/9.png','../assets/image/game/10.png','../assets/image/game/11.png','../assets/image/game/12.png',
    '../assets/image/game/13.png','../assets/image/game/14.png','../assets/image/game/15.png',
];

let tiles = [];
let solvedTiles = [];
let moveHistory = []; // 動かした履歴を記録

// 初期化
function initPuzzle() {
    tiles = [...imagePaths.map((path, index) => ({
        id: index + 1,
        image: path
    })), { id: 16, empty: true }];

    solvedTiles = JSON.parse(JSON.stringify(tiles));
    moveHistory = [];

    // シャッフル（履歴を記録しながら）
    shuffleWithHistory(100);

    renderPuzzle();
}

// 履歴を記録しながらシャッフル
function shuffleWithHistory(times) {
    for (let i = 0; i < times; i++) {
        const emptyIndex = tiles.findIndex(tile => tile.empty);
        const candidates = [];
        if (emptyIndex - 4 >= 0) candidates.push(emptyIndex - 4);
        if (emptyIndex + 4 < 16) candidates.push(emptyIndex + 4);
        if (emptyIndex % 4 !== 0) candidates.push(emptyIndex - 1);
        if (emptyIndex % 4 !== 3) candidates.push(emptyIndex + 1);
        const moveIndex = candidates[Math.floor(Math.random() * candidates.length)];
        moveHistory.push({from: moveIndex, to: emptyIndex});
        [tiles[moveIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[moveIndex]];
    }
}

// パズルを描画
function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('puzzle-piece');
        if (tile.empty) {
            tileElement.classList.add('empty');
        } else {
            tileElement.style.backgroundImage = `url(${tile.image})`;
        }
        tileElement.dataset.index = index;
        tileElement.addEventListener('click', () => moveTile(index));
        puzzleContainer.appendChild(tileElement);
    });
}

// タイルを移動
function moveTile(index) {
    const emptyIndex = tiles.findIndex(tile => tile.empty);
    const validMoves = [emptyIndex - 4, emptyIndex + 4];
    if (emptyIndex % 4 !== 0) validMoves.push(emptyIndex - 1);
    if (emptyIndex % 4 !== 3) validMoves.push(emptyIndex + 1);

    if (validMoves.includes(index)) {
        moveHistory.push({from: index, to: emptyIndex}); // 履歴に記録
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        renderPuzzle();
    }
}

// 配列をシャッフル（未使用）
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 履歴から冗長な逆操作を消す関数
function compressHistory(history) {
    const stack = [];
    for (const move of history) {
        if (
            stack.length > 0 &&
            stack[stack.length - 1].from === move.to &&
            stack[stack.length - 1].to === move.from
        ) {
            // 直前の操作と逆なので両方消す
            stack.pop();
        } else {
            stack.push(move);
        }
    }
    return stack;
}

// 正解ボタンの処理
solveBtn.addEventListener('click', () => {
    // 履歴を逆順にたどって元に戻す（冗長な逆操作は省略）
    let history = compressHistory(moveHistory).reverse();
    function animateReverse() {
        if (history.length === 0) return;
        const move = history.shift();
        // 逆方向に動かす（fromとtoを逆に）
        [tiles[move.to], tiles[move.from]] = [tiles[move.from], tiles[move.to]];
        renderPuzzle();
        setTimeout(animateReverse, 120);
    }
    animateReverse();
});

initPuzzle();