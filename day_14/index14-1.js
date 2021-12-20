const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

let word = lines[0];

const rules = {};

lines.shift();
lines.shift();
lines.forEach(l => {
    const [pair, insertion] = l.split(" -> ");
    rules[pair] = insertion;
});

function insert(pair, insertion) {
    const split = pair.split('');
    return `${split[0]}${insertion}${split[1]}`;
}

function applyRules(word, rules) {

    let newWord = "";

    for (let i = 0; i < word.length - 1; i++) {
        let pair = word[i] + word[i + 1]

        if (rules[pair]) {
            if (!newWord) {
                newWord += insert(pair, rules[pair]);
            } else {
                newWord += insert(pair, rules[pair]).substring(1);
            }
        } else {
            newWord += pair;
        }

    }

    return newWord;

}

for (let i = 0; i < 10; i++) {
    word = applyRules(word, rules);
}

const count = {};

for (let i = 0; i < word.length; i++) {
    
    const element = word.charAt(i);
    
    if (!count[element]){
        count[element] = {
            element,
            count: 1
        }
    } else {
        count[element].count++;
    }
}

const sortedElements = Object.values(count).sort((a,b) => a.count - b.count);
console.log(sortedElements[sortedElements.length-1].count - sortedElements[0].count); // 2874