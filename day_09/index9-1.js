const fs = require('fs');

const input = fs.readFileSync("input.txt");
const map = input.toString().split("\n");


// for(let y = 0; y < map.length; y++) {
//     for(let x = 0; x < map[0].length; x++) {
//     }

// }

let x = y = 0;
let total = 0;

while (x < map[0].length && y < map.length) {

    const up = y > 0 ? map[y - 1][x] : 9;
    const left = x > 0 ? map[y][x - 1] : 9;
    const right = x < map[0].length - 1 ? map[y][x + 1] : 9;
    const down = y < map.length - 1 ? map[y + 1][x] : 9;

    const current = map[y][x];

    if (current < up && current < left && current < right && current < down) {
        total += 1 + parseInt(current);
    }

    x++;
    
    if (x === map[0].length) {
        x = 0;
        y++;
    }

}

console.log(total); // 588