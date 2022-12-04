const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractLine(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    const lines = content.toLocaleString();
    return lines;
}

function parenthesisToInt(char){
    if(char == '(') return 1;
    if(char == ')') return -1;
    return 0;
}

function stringToInt(str){
    let total = 0;
    const values = str.split('');
    for(let i = 0; i < values.length; i++){
        total += parenthesisToInt(values[i]);
    }
    return total;
}

function firstBasement(str){
    let total = 0;
    const values = str.split('');
    for(let i = 0; i < values.length; i++){
        total += parenthesisToInt(values[i]);
        if(total == -1) return i+1;
    }
    return -1;
}

const lines = extractLine();
console.log(`Result for part 1 is ${stringToInt(lines)}`);
console.log(`Result for part 2 is ${firstBasement(lines)}`);