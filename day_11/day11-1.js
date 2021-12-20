const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

const grid = lines.map(line => line.split(''));

let flashCount = 0;

function increase(grid) {
    grid.forEach(g => {
        for (let x = 0; x < g.length; x++) {
            g[x]++;
        }
    });
}

function inRange(i) {
    return i >= 0 && i < lines.length;
}


function doFlash(grid, x, y, flashed) {

    grid[y][x] = 0;
    flashCount++;
    flashed.push(`${x},${y}`);

    for (let tempY = y - 1; tempY <= y + 1; tempY++) {
        for (let tempX = x - 1; tempX <= x + 1; tempX++) {
            if (inRange(tempY) && inRange(tempX)) {
                if (!flashed.includes(`${tempX},${tempY}`)) {
                    grid[tempY][tempX] += 1;
                    if (grid[tempY][tempX] > 9) {
                        doFlash(grid, tempX, tempY, flashed);
                    }
                }
            }
        }
    }

}


function considerFlashing(grid) {
    let flashed = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] > 9 && !flashed.includes(`${x},${y}`)) {
                doFlash(grid, x, y, flashed);
            }
        }
    }
}

for (let i = 0; i < 100; i++) {
    increase(grid);
    considerFlashing(grid);   
}

console.log(flashCount);