const fs = require('fs');

const input = fs.readFileSync("input.txt");
const lines = input.toString().split("\n");

let points = [];
const fold = [];

lines.forEach(l => {
    if (l === "") {
        return;
    } else if (l.startsWith("fold along")) {
        fold.push(l);
    } else {
        points.push(l);
    }

});

function foldAlongY(points, foldAt) {

    let newPoints = {};

    points.forEach(p => {

        const x = parseInt(p.split(",")[0]);
        const y = parseInt(p.split(",")[1]);

        if (y < foldAt) {
            newPoints[`${x},${y}`] = ""; // points above fold line do not change
        } else {
            const newX = x; // does not change
            const newY = 2 * foldAt - y;

            if (newY >= 0) {
                newPoints[`${newX},${newY}`] = ""; // points above fold line do not change
            }

        }
    });

    return Object.keys(newPoints).sort();
}

function foldAlongX(points, foldAt) {

    let newPoints = {};

    points.forEach(p => {

        const x = parseInt(p.split(",")[0]);
        const y = parseInt(p.split(",")[1]);

        if (x < foldAt) {
            newPoints[`${x},${y}`] = ""; // points left of fold line do not change
        } else {
            const newY = y; // does not change
            const newX = 2 * foldAt - x;

            if (newX >= 0) {
                newPoints[`${newX},${newY}`] = ""; // points above fold line do not change
            }

        }

    });

    return Object.keys(newPoints);;

}

function output() {
    let maxX = 0;
    let maxY = 0;

    points.forEach(p => {

        const x = parseInt(p.split(",")[0]);
        const y = parseInt(p.split(",")[1]);

        if (x > maxX) {
            maxX = x;
        }

        if (y > maxY) {
            maxY = y;
        }

    });

    for (let y = 0; y <= maxY; y++) {
        let line = "";
        for (let x = 0; x <= maxX; x++) {
            if (points.includes(`${x},${y}`)) {
                line += "#";
            } else {
                line += ".";
            }

        }
        console.log(line);
    }

}

let i = 1;
fold.forEach(f => {

    const command = f.split("=")[0];
    const pos = parseInt(f.split("=")[1]);


    if (command === "fold along x") {
        points = foldAlongX(points, pos);
    } else if (command === "fold along y") {
        points = foldAlongY(points, pos);
    }

    console.log(`Fold ${i++}: ${points.length} Points`);

});

console.log() // 666