const fs = require('fs');

const input = fs.readFileSync("input.txt");
const map = input.toString().split("\n");



function walk(point, map, visitedPoints = []) {

    let basinPoints = [];

    if (!!visitedPoints.find(p => p.x === point.x && p.y === point.y)) {
        return basinPoints;
    } else {
        visitedPoints.push({
            x: point.x,
            y: point.y
        });
    }

    const maxX = map[0].length;
    const maxY = map.length;

    const current = parseInt(map[point.y][point.x]);

    if (current === 9) {
        return basinPoints;
    }

    basinPoints.push({
        x: point.x,
        y: point.y,
        value: current
    });

    let res;
    if (point.x - 1 >= 0) {
        res = walk({
            x: point.x - 1,
            y: point.y
        }, map, visitedPoints);
        basinPoints = basinPoints.concat(res);
    }

    if (point.x + 1 < maxX) {
        res = walk({
            x: point.x + 1,
            y: point.y
        }, map, visitedPoints);
        basinPoints = basinPoints.concat(res);
    }

    if (point.y - 1 >= 0) {
        res = walk({
            x: point.x,
            y: point.y - 1
        }, map, visitedPoints);
        basinPoints = basinPoints.concat(res);
    }

    if (point.y + 1 < maxY) {
        res = walk({
            x: point.x,
            y: point.y + 1
        }, map, visitedPoints);
        basinPoints = basinPoints.concat(res);
    }

    return basinPoints;

}


function findLowPoints(map) {

    let x = y = 0;
    const lowPoints = [];

    while (x < map[0].length && y < map.length) {

        const up = y > 0 ? map[y - 1][x] : undefined;
        const left = x > 0 ? map[y][x - 1] : undefined;
        const right = x < map[0].length - 1 ? map[y][x + 1] : undefined;
        const down = y < map.length - 1 ? map[y + 1][x] : undefined;

        const current = map[y][x];

        if ((!up || current < up) &&
            (!left || current < left) &&
            (!right || current < right) &&
            (!down || current < down)) {

            lowPoints.push({ x, y });

        }

        x++;
        if (x === map[0].length) {
            x = 0;
            y++;
        }

    }

    return lowPoints;
}

const lowPoints = findLowPoints(map);
const basins = [];

lowPoints.forEach(lp => basins.push(walk(lp, map)));
basins.sort((a, b) => a.length - b.length);

let total = 1;
for (let i = basins.length - 3; i < basins.length; i++) {
    total *= basins[i].length;
}

console.log(total); // 964712
