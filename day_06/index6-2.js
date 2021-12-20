const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const ancientFishes = input.split(",").map(str => parseInt(str));

const ageSorted = {};
ancientFishes.forEach(f => {

  let generation = ageSorted[f];

  if (!generation) {
    ageSorted[f] = {
      days: f,
      fishCount: 1
    }
  } else {
    generation.fishCount++;
  }

});

const fishes = [...Object.values(ageSorted)];

for (let day = 1; day <= 256; day++) {

  let nextGenCount = 0;

  fishes.forEach((g, i) => {

    if (g.days === 0) {
      g.days = 6
      nextGenCount += g.fishCount;
    } else {
      g.days--;
    }

  });

  if (nextGenCount > 0) {
    fishes.push({
      days: 8,
      fishCount: nextGenCount
    });
  }

}

const total = fishes.reduce((acc,g) => acc += g.fishCount, 0);
console.log(total);
