const fs = require('fs');

const input = fs.readFileSync("input.txt");
const values = input.toString().split("\n");

let occurences = [];

values.forEach(line => {

  for(let i = 0; i < line.length; i++) {
    const bitValue = line.charAt(i);

    let occurence = occurences[i];
    if (!occurence) {
      occurence = occurences[i] = [0,0];
    }

    occurence[bitValue]++;

  }

});

const aGamma = occurences.map(occurence => Number(occurence[0] < occurence[1]));

const aEpsilon = aGamma.map(bit => Number(!bit));

const gamma = parseInt(aGamma.join(''),2);
const epsilon = parseInt(aEpsilon.join(''),2);

console.log(gamma * epsilon);