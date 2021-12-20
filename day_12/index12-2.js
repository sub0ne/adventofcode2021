const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

const flatCaves = {};

lines.forEach(conn => {
    const [fromName, toName] = conn.split('-');

    let fromCave = flatCaves[fromName];
    let toCave = flatCaves[toName];

    if (!fromCave) {
        fromCave = {
            name: fromName,
            to: [],
            visited: 0
        };
        flatCaves[fromName] = fromCave;

    }

    if (!toCave) {
        toCave = {
            name: toName,
            to: [],
            visited: 0
        };
        flatCaves[toName] = toCave;
    }

    toCave.to.push(fromCave);
    fromCave.to.push(toCave);

});

function countOccurences(find, text) {
    let count = 0;
    let startPosition = 0;
    while (startPosition >= 0) {

        startPosition = text.indexOf(find, startPosition);

        if (startPosition >= 0) {
            startPosition += find.length;
            count++;
        }
    }

    return count;
}


function canBeVisited(name, path) {

    const caves = path.split("-");
    const smallCaves = caves.filter(c => c !== "start" && c !== "end" && c.match(/^[a-z]+$/g));

    const caveCount = {};
    smallCaves.forEach(c => {
        let count = caveCount[c];
        if (!count) {
            caveCount[c] = 1;
        } else {
            caveCount[c] = ++count;
        }
    });

    if (Object.values(caveCount).every(c => c == 1)) {
        return true;
    } else if (Object.values(caveCount).some(c => c >= 2) && caveCount[name] === undefined) {
        return true;
    } return false;

}


function collectPaths(cave, pathToHere = '', paths = []) {

    if (!pathToHere) {
        pathToHere = cave.name;
    } else {
        pathToHere += `-${cave.name}`;
    }

    if (cave.name === 'end') {
        paths.push(pathToHere);
        //console.log(pathToHere);
        return paths;
    }

    if (cave.name.match(/^[a-z]+$/g)) {
        // cave.visited = true;
        cave.visited++;
    }

    cave.to.forEach(c => {

        if (c.name === "start") {
            return paths;
        }

        // if (c.name.match(/^[a-z]+$/g) && countOccurences(c.name, pathToHere) === 2) {
        if (c.name.match(/^[a-z]+$/g) && !canBeVisited(c.name, pathToHere)) {
            return paths;
        }

        collectPaths(c, pathToHere, paths);
    });

    return paths;

}

const root = flatCaves['start'];
const paths = collectPaths(root);

console.log(paths.length); // 147784


