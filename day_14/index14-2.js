const { count } = require('console');
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

let pairs = {};
for (let i = 0; i < word.length - 1; i++) {
    const pair = getKey(word[i], word[i + 1]);
 
    if (!pairs[pair]) {
        pairs[pair] = {
            count: 1
        }
    } else {
        pairs[pair].count++;
    }

}

function getKey(a, b) {
    return a + b;
}

function applyRules(pairs, rules) {

    const nextPairs = {};

    for (let key in rules) {
        const pair = pairs[key];

        if (!pair) {
            continue;
        } else {
            const [a, b] = key.split('');

            
            if (!nextPairs[key]) {
                nextPairs[key] = {
                    count: 0
                }
            } else {
                nextPairs[key].count = nextPairs[key].count - pair.count;
            }

            if (!nextPairs[getKey(a, rules[key])]) {
                if (pairs[getKey(a, rules[key])]) {
                    nextPairs[getKey(a, rules[key])] = {
                        count: pairs[getKey(a, rules[key])].count + pair.count
                    }
                } else {
                    nextPairs[getKey(a, rules[key])] = {
                        count: pair.count
                    }
                }
            } else {
                nextPairs[getKey(a, rules[key])].count += pair.count;
            }

            if (!nextPairs[getKey(rules[key], b)]) {
                if (pairs[getKey(rules[key], b)]) {
                    nextPairs[getKey(rules[key], b)] = {
                        count: pairs[getKey(rules[key], b)].count + pair.count
                    }
                } else {
                    nextPairs[getKey(rules[key], b)] = {
                        count: pair.count
                    }
                }
            } else {
                nextPairs[getKey(rules[key], b)].count += pair.count;
            }

        }

    }

    for (let pairKey in nextPairs) {
        pairs[pairKey] = nextPairs[pairKey];
    }
}


function sumUp(pairs) {

    const count = {};


    for (let key in pairs) {
        const [a, b] = key.split('');

        if (!count[a]) {
            count[a] = pairs[key].count;
        } else {
            count[a] = count[a] + pairs[key].count;
        }

        if (!count[b]) {
            count[b] = pairs[key].count;
        } else {
            count[b] = count[b] + pairs[key].count;
        }

    }

    for (let key in count) {
        count[key] = Math.round((parseFloat(count[key]) / 2));
    }

    return count;

}

function getResult(count) {
    let lowest = Object.values(count)[0];
    let highest = 0;

    for(let key in count) {
        if (count[key] < lowest) {
            lowest = count[key];
        }

        if (count[key] > highest) {
            highest = count[key];
        }
    }

    return highest - lowest;
    
}

for (let i = 0; i < 40; i++) {
    applyRules(pairs, rules);
}

const sum = sumUp(pairs);
console.log(getResult(sum)); // 5208377027195