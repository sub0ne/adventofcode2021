const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

const flatCaves = {};

lines.forEach(conn => {
    const [fromName,toName] = conn.split('-');
    
    let fromCave = flatCaves[fromName];
    let toCave = flatCaves[toName];

    if (!fromCave) {
        fromCave = {
            name: fromName,
            to: []
        };
        flatCaves[fromName] = fromCave;

    } 
    
    if (!toCave) {
        toCave = {
            name: toName,
            to: []
        };
        flatCaves[toName] = toCave;
    }

    toCave.to.push(fromCave);
    fromCave.to.push(toCave);
    
});



function collectPaths(cave, pathToHere = '', paths = []) {
    
    if (!pathToHere) {
        pathToHere = cave.name;
    } else {
        pathToHere += `-${cave.name}`;
    }

    if (cave.name === 'end') {
        paths.push(pathToHere);
        return paths;
    }

    if(cave.name.match(/^[a-z]+$/g)) {
        cave.visited = true;
    }

    cave.to.forEach(c => {

        if (c.visited) {
            return;
        }
   
        collectPaths(c, pathToHere, paths);
    });

    cave.visited = false;

    return paths;

}

const start = flatCaves['start'];
const paths = collectPaths(start); 

console.log(paths.length); // 5252

