const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { MD5 } = require('md5-js-tools');

function extractKey(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let key = content.toLocaleString();
    return key;
}

const key = extractKey();
let i = 0, j = 0;

while(!((MD5.generate(key+i)).startsWith('00000'))){
    i++;
}

while(!((MD5.generate(key+j)).startsWith('000000'))){
    j++;
}

console.log(`Result for part 1 is ${i}`);
console.log(`Result for part 2 is ${j}`);