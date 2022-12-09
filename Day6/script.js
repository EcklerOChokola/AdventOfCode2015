const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractInstructions(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let instructions = content.toLocaleString().split('\n');
    instructions.pop();
    return instructions;
}

const turnOnCommand = new RegExp('turn on ([0-9]*),([0-9]*) through ([0-9]*),([0-9]*)', 'gm');
const turnOffCommand = new RegExp('turn off ([0-9]*),([0-9]*) through ([0-9]*),([0-9]*)', 'gm');
const toggleCommand = new RegExp('toggle ([0-9]*),([0-9]*) through ([0-9]*),([0-9]*)', 'gm');

let grid = [];

function initGrid(){
    for(let i = 0; i < 1000; i++){
        let temp = [];
        for(let j = 0; j < 1000; j++){
            temp.push(0)
        }
        grid.push(temp);
    }
}

function turnOff(a, b, x, y, situation){
    for(let i = Math.min(a, x); i <= Math.max(a, x); i++){
        for(let j = Math.min(b, y); j <= Math.max(b, y); j++){
            if(situation == 1) grid[i][j] = 0;
            if(situation == 2) grid[i][j] = Math.max(0, grid[i][j] - 1);
        }
    }
}

function turnOn(a, b, x, y, situation){
    for(let i = Math.min(a, x); i <= Math.max(a, x); i++){
        for(let j = Math.min(b, y); j <= Math.max(b, y); j++){
            if(situation == 1) grid[i][j] = 1;
            if(situation == 2) grid[i][j] = grid[i][j] + 1;
        }
    }
}

function toggle(a, b, x, y, situation){
    for(let i = Math.min(a, x); i <= Math.max(a, x); i++){
        for(let j = Math.min(b, y); j <= Math.max(b, y); j++){
            const newValue = grid[i][j];
            if(situation == 1) grid[i][j] = newValue == 0 ? 1 : 0;
            if(situation == 2) grid[i][j] = newValue + 2;
        }
    }
}

function distributeCommand(str, situation){
    let positions = turnOffCommand.exec(str);
    if(positions !== null) {
        turnOffCommand.lastIndex = 0;
        turnOff(
            positions[1],
            positions[2],
            positions[3],
            positions[4],
            situation
        );
        return;
    }
    positions = turnOnCommand.exec(str);
    if(positions !== null) {
        turnOnCommand.lastIndex = 0;
        turnOn(
            positions[1],
            positions[2],
            positions[3],
            positions[4],
            situation
        );
        return;
    }
    positions = toggleCommand.exec(str);
    toggleCommand.lastIndex = 0;
    toggle(
        positions[1],
        positions[2],
        positions[3],
        positions[4],
        situation
    );
}

function countGridBrightness(){
    let count = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            count += grid[i][j];
        }
    }
    return count;
}

initGrid();
const commands = extractInstructions();
for(let i = 0; i < commands.length; i++){
    distributeCommand(commands[i], 1);
}
const part1 = countGridBrightness();

grid = [];
initGrid();
for(let i = 0; i < commands.length; i++){
    distributeCommand(commands[i], 2);
}
const part2 = countGridBrightness();

console.log(`Result for part 1 is ${part1}`);
console.log(`Result for part 2 is ${part2}`);