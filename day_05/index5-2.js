const fs = require('fs');
const { start } = require('repl');

const input = fs.readFileSync("input.txt");
const data = input.toString().split("\n");

function getPoints(a, b) {

    const startCoord = [parseInt(a[0]), parseInt(a[1])];
    const endCoord = [parseInt(b[0]), parseInt(b[1])];

    deltaX = startCoord[0] - endCoord[0];
    deltaY = startCoord[1] - endCoord[1];

    let incrementX = deltaX !== 0 ? deltaX * -1 / Math.abs(deltaX) : 0;
    let incrementY = deltaY !== 0 ? deltaY * -1 / Math.abs(deltaY) : 0;

    let coord = [...startCoord];
    const coords = [];

    while (coord[0] !== endCoord[0] || coord[1] !== endCoord[1]) {

        coords.push([...coord]);

        coord[0] += incrementX;
        coord[1] += incrementY;
    }

    coords.push(endCoord);

    return coords;

}

const map = [];

data.forEach(d => {

    const start = d.split(" -> ")[0].split(",");
    const end = d.split(" -> ")[1].split(",");

    const points = getPoints(start, end);

    points.forEach(p => {
        const coord = `(${p[0]},${p[1]})`;
        const value = map[coord];

        if (!value) {
            map[coord] = 1
        } else {
            map[coord]++;
        }

    });

});

let count = 0;

Object.values(map).forEach(v => {
    if (v > 1) {
        count++;
    }
});

console.log(count); // 20121