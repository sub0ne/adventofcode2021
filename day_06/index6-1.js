/* Setup */
const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input2.txt'), 'utf8');

console.log(input);

const fishes = input.split(",").map(str => parseInt(str));

for(let day = 1; day <= 256; day++) {

  fishes.forEach((f, i) => {

    if (f === 0) {
      fishes[i] = 6
      fishes.push(8);
    } else {
      fishes[i]--;
    }

  });

  console.log(`Day ${day}`);

}

console.log(fishes.length);