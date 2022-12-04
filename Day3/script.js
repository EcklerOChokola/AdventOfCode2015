const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractChars(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let lines = content.toLocaleString().split('');
    return lines;
}

const chars = extractChars();

// console.log(`Result for part 1 is ${sumSurfacesFromLines(lines)}`);
// console.log(`Result for part 2 is ${sumWrapsFromLines(lines)}`);