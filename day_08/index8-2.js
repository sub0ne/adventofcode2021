const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split("\r\n");

/**
 * does signal A contain signal B
 */
function containsSignal(a, b) {

  for (let s of b.split("")) {
    if (!a.includes(s)) {
      return false;
    }
  }

  return true;

}

/**
 * decode digit with map
 */
function decodeDigit(digit, map) {

  let result = "";
  const encodedDigits = Object.values(map);

  digit.forEach(d => {
        
    for(let i = 0; i < encodedDigits.length; i++) {
      if(d.length === encodedDigits[i].length && containsSignal(encodedDigits[i], d)) {
        result += i.toString();
      }
    }

  });

  return result;

}

/**
 * find a signal  within a basket 
 * signal must contain a given word and must have a certain length
 */
function findWithWordAndLength(basket, containedWord, length) {

  for (let i = 0; i < basket.length; i++) {
    if (containsSignal(basket[i], containedWord) && basket[i].length === length) {
      return i;
    }
  }

  return undefined;

}


function getDigitMapping(signals) {

  const signalBasket = [...signals];
  const map = {};

  // 1 (Length 2)
  let index = signalBasket.findIndex(s => s.length === 2);
  map[1] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 4 (Length 4)
  index = signalBasket.findIndex(s => s.length === 4)
  map[4] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 7 (Length 3)
  index = signalBasket.findIndex(s => s.length === 3)
  map[7] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 8 (Length 7)
  index = signalBasket.findIndex(s => s.length === 7);
  map[8] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 9 (contains 4, Length 6)
  const four = map[4];
  index = findWithWordAndLength(signalBasket, four, 6);
  map[9] = signalBasket[index];
  signalBasket.splice(index, 1);  

  // 3 (contains 7, Length 5)
  const seven = map[7];
  index = findWithWordAndLength(signalBasket, seven, 5);
  map[3] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 0 (contains 7, Length 6)
  index = findWithWordAndLength(signalBasket, seven, 6);
  map[0] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 6 (Length 6))
  index = signalBasket.findIndex(s => s.length === 6);
  map[6] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 5 (fully contained in 6)
  const six = map[6];
  index = signalBasket.findIndex(s => containsSignal(six, s));
  map[5] = signalBasket[index];
  signalBasket.splice(index, 1);

  // 2 (remaining)
  map[2] = signalBasket[0]; 

  return map;

}

let total = 0;

input.forEach(line => {

  const [a, b] = line.split(" | ");
  const signals = a.split(" ")

  const map = getDigitMapping(signals);
  const encodedDigit = b.split(" ");

  let decodedDigit = decodeDigit(encodedDigit, map);

  total +=  parseInt(decodedDigit);

});

console.log(total);
