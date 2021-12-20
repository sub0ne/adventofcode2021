const fs = require('fs');

const input = fs.readFileSync("input.txt");
const data = input.toString().split("\n");

class Board {

    constructor() {
        this._boardData = [];
        this._boardNumbers = {};
    }

    add(boardData) {
        this._boardData.push(boardData.map(d => {

            if (isNaN(d)) {
                throw "illegal number"; 
            }

            this._boardNumbers[d] = {
                drawn: false,
                number: d
            };

            return this._boardNumbers[d];
        }));

    }

    setNumberDrawn(number) {

        if (isNaN(number)) {
            throw "illegal number"; 
        }

        const boardNumber = this._boardNumbers[number];
        
        if (boardNumber) {
            boardNumber.drawn = true;
            return this._checkWin();
        }
    }


    _checkWin() {

        const rows = [true, true, true, true, true];
        const cols = [true, true, true, true, true];

        this._boardData.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (!col.drawn) {
                    rows[rowIndex] = false;
                    cols[colIndex] = false;
                }
            });
        });

        return rows.some(r => r) || cols.some(c => c);
        
    }


    getSum() {
        let sum = 0;
        this._boardData.forEach(row => {
            row.forEach(col => {
                if (!col.drawn) {
                    sum += col.number;
                }
            });

        });

        return sum;
    }

}

// build data
let draw = data[0].split(",");
const boards = [];

let board;
data.forEach((d, index) => {
    if (index === 0) {
        return;
    }

    if (d === "") {
        board = new Board();
        boards.push(board);
    } else {
        const numbers = d.match(/\d+/gm).map(strNumber => Number.parseInt(strNumber));
        board.add(numbers);
    }

});

// evaluate
let winningBoard;
let winningNumber;

let drawnIndex = 0;
while (!winningBoard) {

    for (let i = 0; i < boards.length; i++) {
        if (boards[i].setNumberDrawn(draw[drawnIndex])) {
            winningBoard = boards[i];
            winningNumber = draw[drawnIndex];
            break;
        }
    }

    drawnIndex++;

}

console.log(winningNumber * winningBoard.getSum()); // 45031


