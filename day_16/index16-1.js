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

let versionSum = 0;

function processPackage(package) {

    let it = 0;

    while (it < package.length && package.substring(it).includes('1')) {

        const version = package.substring(it, it += 3);
        const type = package.substring(it, it += 3);

        versionSum += binToDec(version);

        if (binToDec(type) === 4) {

            let b = '';
            let payload = '';
            do {
                b = package.substring(it, it += 5);
                payload += b.substring(1);

            } while (b[0] === '1');

        } else {
            const lengthTypeID = package.substring(it, it += 1);

            let length;

            let subPackage;
            // total length in bits
            if (lengthTypeID === '0') {
                length = package.substring(it, it += 15);
                subPackage = package.substring(it, it += binToDec(length));
                processPackage(subPackage);
                // number of sub-packets immediately contained
            } else if (lengthTypeID === '1') {
                length = package.substring(it, it += 11);                
                subPackage = package.substring(it);
                it += processPackage(subPackage);
            }           
            
        }
    }

    return it;

}

versionSum = 0;
processPackage(getBinary(lines[0])); //889
console.log(versionSum);


