const fs = require('fs');

const input = fs.readFileSync("input.txt");
const values = input.toString().split("\n");

let acc = undefined;
let previousAcc = undefined;
let count = 0;

values.forEach((value, index) => {
 
  if (index < 2) {
    return;
  }
 
  acc = 0;

  for(let i = 0; i < 3; i++) {
    acc += Number.parseInt(values[index - i]);
  }

  if (previousAcc && previousAcc < acc) {    
    count++;
  }

  previousAcc = acc;   

});

console.log(count);