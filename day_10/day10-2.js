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

function getPoints(remainingChunks) {

    let points = 0;

    let closing = "";

    for(let i = remainingChunks.length - 1; i >= 0; i--) {

        points *= 5;

        closing += getExpectedChunk(remainingChunks[i]);

        switch (getExpectedChunk(remainingChunks[i])) {
            case ")": 
                points += 1;
                break;
            case "]": 
                points += 2;
                break;
            case "}": 
                points += 3;
                break;
            case ">": 
                points += 4;
                break;
        }
       
    }

    return points;
}

const aPoints = [];

lines.forEach((line, index) => {

    const stack = [];

    let corrupt = false;
    for (let chunk of line.split('')) {

        if (openBrackets.includes(chunk)) {
            stack.push(chunk);
        } else {

            if (getExpectedChunk(stack[stack.length - 1]) === chunk) {
                stack.pop();
            } else {
                corrupt = true;
                break;
            }
        }

    }
    
    if (!corrupt) {
        aPoints.push(getPoints(stack));
    }

});

aPoints.sort((a,b) => a - b);
console.log(aPoints[( aPoints.length  - 1 )/ 2]); // 3241238967