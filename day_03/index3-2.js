const fs = require('fs');

const input = fs.readFileSync("input.txt");
const values = input.toString().split("\n");

function filter(values, bitPosition) {
  return values.reduce((acc,cur) => {
    const bit = cur.charAt(bitPosition);
    acc[bit].push(cur);
    return acc;
  }, [[],[]]);
}

// oxygen
let bitPosition = 0;
let oxygenValues = values;

while(oxygenValues.length > 1) {
  const asorted = filter(oxygenValues, bitPosition++);
  oxygenValues = asorted[0].length !== asorted[1].length ? asorted[0].length > asorted[1].length ? asorted[0] : asorted[1] : asorted[1];
}

// co2
bitPosition = 0;
let co2Values = values;

while(co2Values.length > 1) {
  const asorted = filter(co2Values, bitPosition++);
  co2Values = asorted[0].length !== asorted[1].length ? asorted[0].length < asorted[1].length ? asorted[0] : asorted[1] : asorted[0];
}

const oxygen = parseInt(oxygenValues[0], 2);
const co2 = parseInt(co2Values[0], 2);

console.log(oxygen * co2);


