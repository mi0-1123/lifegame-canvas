var lifegame;
var ctx;
const cellSize = 8;
var col; //列の数
var row; //行の数
var cells;
const ALIVE = 'rgb(67,160,71)';
const DEAD = 'rgb(60, 60, 60)';


window.onload = function () {
    init();
    setInterval( function() {
        update();
        draw();
    }, 1 / 3000);
}
//初期化
function init() {
    console.log('init');
    lifegame = document.getElementById('lifegame');
    ctx = lifegame.getContext('2d');
    row = Math.floor(lifegame.width / cellSize);
    col = Math.floor(lifegame.height / cellSize);
    ctx.beginPath();
    ctx.fillStyle = 'rgb(60,60,60)';
    ctx.fillRect(0, 0, 640, 640);
    cells = new Array(row);
    for(let r = 0; r < row; r++) {
        cells[r] = new Array(col);
    }
    fillRandom();
    draw();
}

function fillRandom() {
    console.log('fill random');
    for(let r = 0; r < row; r++) {
        for(let c = 0; c < col; c++) {
            cells[r][c] = Math.round(Math.random());
        }
    }
    // checkCells();
}

function checkCells() {
    for(let r = 0; r < row; r++) {
        console.log(cells[r]);
    }
}

//絵画
function draw() {
    for(let r = 0; r < row; r++) {
        for(let c = 0; c < col; c++) {
           fillCell(r, c);
        }
    }
}

function fillCell(r, c) {
    ctx.beginPath();
    ctx.fillStyle = cells[r][c] ? ALIVE : DEAD;
    ctx.fillRect(c*cellSize, r*cellSize, (c+1)*cellSize, (r+1)*cellSize );
}

//状態の更新
function update() {
    let newCells = new Array(row);
    for(let r = 0; r < row; r++) {
        newCells[r] = new Array(col);
    }

    for(let r = 0; r < row; r++) {
        for(let c = 0; c < col; c++) {
            const n = count(r, c);
            if(cells[r][c]) {
                newCells[r][c] = n===3||n===2 ? 1 : 0;
            } else {
                newCells[r][c] = n===3 ? 1 : 0;
            }
        }
    }
    cells = newCells;
}

function count(r, c) {
    let cou = 0;
    let dx = [1, 1, 1, 0, -1, -1, -1, 0];
    let dy = [-1, 0, 1, 1, 1, 0, -1, -1];
    for(let i = 0; i < dx.length; i++) {
        const x = dx[i] + c;
        const y = dy[i] + r;
        if(x < 0 || x >= row || y < 0 || y >= col) continue;
        cou += cells[y][x];
    }
    return cou;
}