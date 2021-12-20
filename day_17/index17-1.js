
class Probe {

    static _count = 1;
    static _terminated = 1;

    constructor() {
        this._position = [0, 0];
        this._fired = false;
        this._name = `Probe #${Probe._count++}`;
        this._maxY = 0;
    }

    fire(velX, velY, aTargetRange) {
        return new Promise((res) => {
            this._iteration = 0;
            this._fired = true;
            this._aTargetRange = aTargetRange;
            this._velX = velX;
            this._velY = velY;
            this._velXStart = velX;
            this._velYStart = velY;

            this._i = setInterval(this._moveProbe.bind(this), 1);
            this._res = res;
        });
    }

    _moveProbe() {

        this._iteration++;

        this._position[0] += this._velX;
        this._position[1] += this._velY;

        if (this._maxY < this._position[1]){
            this._maxY = this._position[1];
        }

        if (this._velX !== 0) {
            this._velX = this._velX > 0 ? this._velX - 1 : this._velX + 1;
        }

        this._velY--;

        this._checkHit();

    }

    _checkHit() {

        if (this._position[0] <= aTargetRange[0][0] &&
            this._position[1] >= aTargetRange[1][0]) {
            // probe under way  
        }
        else if (
            this._position[0] >= aTargetRange[0][0] &&
            this._position[0] <= aTargetRange[0][1] &&
            this._position[1] <= aTargetRange[1][0] &&
            this._position[1] >= aTargetRange[1][1]
        ) {
            // hit
            clearInterval(this._i);
            this._hit = true;
            this._res();
        }
        else if (
            this._position[0] >= aTargetRange[0][1] ||
            this._position[1] <= aTargetRange[1][1]
        ) {
            //missed
            clearInterval(this._i);
            this._hit = false;
            this._res();
        }

    }

}

//const aTargetRange = [[20, 30], [-5, -10]]; // Example
const aTargetRange = [[124, 174], [-86, -123]]; // Input data

let probes = [];
let promises = [];
for(let i = 0; i < 200; i++) {
    for(let j= 0; j < 200; j++) {
        const p = new Probe();
        probes.push(p);
        promises.push(p.fire(i,j, aTargetRange));
    }
}

Promise.all(promises).then(() => {
    const p = probes.filter(p => p._hit).sort((a,b) => b._maxY - a._maxY)[0];
    console.log(`${p._name} did hit, max height: ${p._maxY}, VelocityX:${p._velXStart} VelocityY:${p._velYStart}`);
    // 7503
});

