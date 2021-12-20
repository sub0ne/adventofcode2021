const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, "input.txt"));
const lines = input.toString().split("\n");

function getBinary(line) {
    let binary = "";
    for (let i = 0; i < line.length; i++) {
        const hex = line.charAt(i);
        const convertedBinary = parseInt(hex, 16).toString(2).padStart(4, '0');
        binary += convertedBinary;
    }
    return binary;
}

function binToDec(binary) {
    return parseInt(binary, 2);
}

function processPackage(package, maxCount = -1) {

    let it = 0;
    let values = [];
    let count = 0;

    while (it < package.length && package.substring(it).includes('1')) {

        if (maxCount > 0 && count === maxCount) {
            break;
        }

        const version = package.substring(it, it += 3);
        const type = package.substring(it, it += 3);

        if (binToDec(type) === 4) {

            let b = '';
            let payload = '';
            do {
                b = package.substring(it, it += 5);
                payload += b.substring(1);

            } while (b[0] === '1');

            values.push(binToDec(payload));

        } else {
            const lengthTypeID = package.substring(it, it += 1);

            let length;

            let subPackage;
            let result;
            // total length in bits
            if (lengthTypeID === '0') {
                length = package.substring(it, it += 15);
                subPackage = package.substring(it, it += binToDec(length));
                result = processPackage(subPackage);

                // number of sub-packets immediately contained
            } else if (lengthTypeID === '1') {
                length = package.substring(it, it += 11);                
                subPackage = package.substring(it);
                
                result = processPackage(subPackage, binToDec(length));
                it += result.it;
            } 
            
            // calc
            let calcResult = undefined;
            switch (binToDec(type)) {
                case 0: // sum
                    calcResult = result.values.reduce((p, c) => p + c, 0);
                    break;
                case 1: // product
                    calcResult = result.values.reduce((p, c) => p * c, 1);
                    break;
                case 2: // minimum
                    calcResult = Math.min(...result.values);
                    break;
                case 3: // maximum
                    calcResult = Math.max(...result.values);
                    break;
                case 5: // greater than
                    calcResult = result.values[0] > result.values[1] ? 1 : 0;
                    break;
                case 6: // less than
                    calcResult = result.values[0] < result.values[1] ? 1 : 0;
                    break;
                case 7: // equal
                    calcResult = result.values[0] === result.values[1] ? 1 : 0;
                    break;
            }
            values.push(calcResult);
                        
        }

        count++;
    }

    return {
        it,
        values
    }

}

console.log(processPackage(getBinary(lines[0])).values[0]); // 739303923668
