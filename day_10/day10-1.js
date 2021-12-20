const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

const openBrackets = "([{<";

function getExpectedChunk(chunk) {
    switch (chunk) {
        case "(": return ")";
        case "{": return "}";
        case "[": return "]";
        case "<": return ">";
    }
}

function getPoints(chunk) {
    switch (chunk) {
        case ")": return 3;
        case "]": return 57;
        case "}": return 1197;
        case ">": return 25137;
    }
}

let points = 0;

lines.forEach((line, index) => {

    const stack = [];

    for (let chunk of line.split('')) {

        if (openBrackets.includes(chunk)) {
            stack.push(chunk);
        } else {

            if (getExpectedChunk(stack[stack.length - 1]) === chunk) {
                stack.pop();
            } else {
                points += getPoints(chunk);
                break;
            }
        }

    }

});

console.log(points);