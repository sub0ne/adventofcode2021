const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const data = input.split(",").map(d => parseInt(d));

let max = 0;
data.forEach(crab => {
  if (crab > max) {
    max = crab;
  }
});

const distances = [];
for(let i = 0; i <= max; i++) {
  let totalCost = 0;
  data.forEach(crab => {
    const dist = Math.abs(i - crab);
    let crabCost = 0;
    for(let c = dist; c > 0; c--) {
      crabCost += c;
    }
    totalCost += crabCost;
    
  });
  distances[i] = totalCost;
}

let minIndex = 0;
let minDist = distances[0];
for(let i = 1; i <= distances.length; i++) {

  if (distances[i] < minDist) {
    minDist = distances[i];
    minIndex = i;
  }
  
}

console.log(minDist);
