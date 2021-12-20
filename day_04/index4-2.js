const fs = require('fs');

const input = fs.readFileSync("input.txt");
const data = input.toString().split("\n");

class Board {

    constructor() {
        this._boardData = [];
        this._boardNumbers = {};
        this._winningNumber = undefined;
    }

    add(boardData) {

        let columnIndex = 0;
        const rowIndex = this._boardData.length;

        this._boardData.push(boardData.map(d => {

            this._boardNumbers[d] = {
                drawn: false,
                number: d,
                columnIndex,
                rowIndex
            };

            columnIndex++;
            return this._boardNumbers[d];
        }));

    }

    setNumberDrawn(number) {

        const boardNumber = this._boardNumbers[number];
        
        if (boardNumber) {
            boardNumber.drawn = true;

            if (this._checkWin(boardNumber)) {
                this._winningNumber = number;
                return true;
            } else {
                return false;
            }
        }
    }

    _checkWin(boardNumber) {

        const boardNumbers = Object.values(this._boardNumbers);

        return boardNumbers.filter(n => n.columnIndex === boardNumber.columnIndex).every(n => n.drawn) ||
               boardNumbers.filter(n => n.rowIndex === boardNumber.rowIndex).every(n => n.drawn)
        
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

    getWinningNumber() {
        return this._winningNumber;
    }

    hasWon() {
        return this.getWinningNumber() !== undefined;
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
let lastWinningBoard;

for(let j = 0; j < draw.length; j++) {

    for (let i = 0; i < boards.length; i++) {
        if (!boards[i].hasWon() && boards[i].setNumberDrawn(draw[j])) {
            lastWinningBoard = boards[i];
        }
    }

}

console.log(lastWinningBoard.getWinningNumber() * lastWinningBoard.getSum()); // 2568


