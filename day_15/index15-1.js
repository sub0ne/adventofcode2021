const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, "input.txt"));
const lines = input.toString().split("\n");

const map = [];

lines.forEach(l => {
    map.push(l.split(''));
});

// use Dijkstra to find cheapest path
const cost = {};
const visited = {};

function key(node) {
    return `${node.row},${node.col}`
}

function nodetify(row, col, cost = Number.MAX_SAFE_INTEGER) {
    return {
        row,
        col,
        cost
    }
}

const priorityQueue = [nodetify(0, 0, 0)];

while (priorityQueue.length > 0) {

    const node = priorityQueue.shift();
    visited[key(node)] = true;

    if (!cost[key(node)] || cost[key(node)].cost < node.cost) {
        cost[key(node)] = node.cost;
    }

    if (node.row === map.length - 1 && node.col === map[0].length - 1) {
        break;
    }

    let values = [];
    values.push((node.row - 1 >= 0) ? nodetify(node.row - 1, node.col) : undefined);
    values.push((node.row + 1 < map.length) ? nodetify(node.row + 1, node.col) : undefined);
    values.push((node.col - 1 > 0) ? nodetify(node.row, node.col - 1) : undefined);
    values.push((node.col + 1 < map[0].length) ? nodetify(node.row, node.col + 1) : undefined);

    values = values.filter(v => !!v && !visited[key(v)]);

    values.forEach(v => {

        const newNode = {
            row: v.row,
            col: v.col,
            cost: parseInt(node.cost) + parseInt(map[v.row][v.col])
        };

        // optimization: 
        // - if there already is a cheaper option in the priorityQueue continue.
        // - if the new node is better, remove the entry from the priorityQueue
        let index = priorityQueue.findIndex(n => n.row === newNode.row && n.col === newNode.col);
        let priorizedNode = priorityQueue[index];

        if (index >= 0) {

            if (priorizedNode.cost < newNode.cost) {
                return;
            } else {
                priorityQueue.splice(index, 1);
            }

        }

        // avoid resorting the whole priorityQueue by putting inserting the node at it's correct position
        index = priorityQueue.findIndex(n => n.cost > newNode.cost);
        if (index === -1) {
            priorityQueue.push(newNode);
        } else {
            priorityQueue.splice(index, 0, newNode);
        }

    });

}

console.log(cost[`${map.length - 1},${map[0].length - 1}`]); // 717