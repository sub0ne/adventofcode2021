const fs = require('fs');

const input = fs.readFileSync("input.txt");
const values = input.toString().split("\n");

let previous = undefined;
let count = 0;

values.forEach(v => {
  
  const current = Number.parseInt(v);

  if (previous && previous < current) {    
    count++;
  }

  previous = current;

});

console.log(count);