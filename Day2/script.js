const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractLines(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let lines = content.toLocaleString().split('\n');
    lines.pop();
    return lines;
}

function lineToTab(str){
    const tmp = str.split('x');
    return tmp;
}

function tabToSurface(tab){
    const tmp2 = [tab[0]*tab[1], tab[0]*tab[2], tab[1]*tab[2]];
    const min = Math.min(...tmp2);
    return 2*(tmp2[0] + tmp2[1] + tmp2[2])+min; 
}

function tabToVolume(tab){
    return tab[0]*tab[1]*tab[2];
}

function tabToWrap(tab, i){
    const bow = tabToVolume(tab);
    const max = Math.max(...tab);
    let index;
    for(let i = 0; i < tab.length; i++){
        if(tab[i] == max){
            index = i;
            break;
        }
    }
    let value = 0;
    for(let i = 0; i < tab.length; i++){
        if(i != index) value += parseInt(tab[i]);
    }
    return 2*(value)+bow;
}

function sumSurfacesFromLines(str){
    let result = 0;
    for(let i = 0; i < str.length; i++){
        result += tabToSurface(lineToTab(str[i]));
    }
    return result;
}

function sumWrapsFromLines(str){
    let result = 0;
    for(let i = 0; i < str.length; i++){
        result += tabToWrap(lineToTab(str[i]), i);
    }
    return result;
}

const lines = extractLines();

console.log(`Result for part 1 is ${sumSurfacesFromLines(lines)}`);
console.log(`Result for part 2 is ${sumWrapsFromLines(lines)}`);