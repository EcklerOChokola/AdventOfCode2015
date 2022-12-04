const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { MD5 } = require("md5-js-tools");

let houses = {};

function extractChars(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let lines = content.toLocaleString().split('');
    return lines;
}

function moveSanta([x, y], char){
    if(char == '^') y++;
    if(char == 'v') y--;
    if(char == '>') x++;
    if(char == '<') x--;
    return [x, y];
}

function addMove(tab, position){
    if(!position in tab){
        tab[position] = 1;
    }else{
        tab[position] += 1;
    }
}

let santasPosition = [0, 0];
addMove(houses, santasPosition);

const chars = extractChars();

for(let i = 0; i < chars.length; i++){
    santasPosition = moveSanta(santasPosition, chars[i]);
    addMove(houses, santasPosition);
}

let houses2 = {}; 
santasPosition = [0, 0];
let robSantasPosition = santasPosition;
addMove(houses2, santasPosition);

for(let i = 0; i < chars.length; i++){
    if(i%2 == 0){
        santasPosition = moveSanta(santasPosition, chars[i]);
        addMove(houses2, santasPosition);
    }else{
        robSantasPosition = moveSanta(robSantasPosition, chars[i]);
        addMove(houses2, robSantasPosition);
    }
}

console.log(`Result for part 1 is ${Object.keys(houses).length}`);
console.log(`Result for part 2 is ${Object.keys(houses2).length}`);