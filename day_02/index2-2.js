const fs = require('fs');

class Submarine {
  
  constructor() {
    this._horizontal = 0;
    this._depth = 0;
    this._aim = 0;
  }

  navigate(direction, value) {

    switch (direction) {
      case 'forward': 
          this._horizontal += value;
          this._depth += this.getAim() * value;
          break;
      case 'up': 
          this._aim -= value;
          break;
      case 'down': 
          this._aim += value;
          break;
    }

  }

  getAim() {
    return this._aim;
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

