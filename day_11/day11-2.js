const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

const grid = lines.map(line => line.split(''));

function increase(grid) {
    grid.forEach(g => {
        for (let x = 0; x < g.length; x++) {
            g[x]++;
        }
    });
}

function isInRange(i) {
    return i >= 0 && i < lines.length;
}

function hasFlashed(x,y, flashed) {
    return flashed.includes(`${x},${y}`);
}


function doFlash(grid, x, y, flashed) {

    grid[y][x] = 0;
    flashed.push(`${x},${y}`);

    for (let tempY = y - 1; tempY <= y + 1; tempY++) {
        for (let tempX = x - 1; tempX <= x + 1; tempX++) {
            if (isInRange(tempY) && isInRange(tempX)) {
                if (!hasFlashed(tempX, tempY, flashed)) {
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


function checkBigBang(grid) {
    const flattenedGrid = grid.reduce((acc, cur) => {
        return cur.concat(acc);
    }, [])
    return flattenedGrid.every(i => i === 0);
}

let step = 0;
do {
    increase(grid);
    considerFlashing(grid);
    if (checkBigBang(grid)) {
        console.log(++step);
        break;
    }  
    step++;
} while(true);




