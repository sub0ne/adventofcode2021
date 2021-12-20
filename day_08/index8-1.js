const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split("\r\n");


let uniqueCount = 0

input.forEach(line => {

  const digits = line.split(" | ")[1].split(" ");

  digits.forEach(d => {

    if (d.length === 2 || d.length === 3 || d.length === 4 || d.length === 7 ){
      uniqueCount++;
    }

  });  

});

console.log(uniqueCount);