const fs = require('fs');

class Submarine {
  
  constructor() {
    this._horizontal = 0;
    this._depth = 0;
  }

  navigate(direction, value) {

    switch (direction) {
      case 'forward': 
          this._horizontal += value;
          break;
      case 'up': 
          this._depth -= value;
          break;
      case 'down': 
          this._depth += value;
          break;
    }

  }

  getDepth() {
    return this._depth;
  }

  getHorizontal() {
    return this._horizontal;
  }  

}

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

const sub = new Submarine();

lines.forEach(v => {

  const command = v.split(" ");

  sub.navigate(command[0], Number.parseInt(command[1]));

});

console.log(`Horizontal: ${sub.getHorizontal()}`);
console.log(`Depth: ${sub.getDepth()}`);
console.log(`Result: ${sub.getDepth() * sub.getHorizontal()}`);

