const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

function extractWords(){
    const content = fs.readFileSync(path.join(cwd(), 'input.txt'));
    let words = content.toLocaleString().split('\n');
    words.pop();
    return words;
}

const vowels = ['a', 'e', 'i', 'o', 'u'];
let part1NiceStrings = 0;
let part2NiceStrings = 0;

function containsDoubleLetter(strArr){
    for(let i = 1; i < strArr.length; i++){
        if(strArr[i-1] == strArr[i]) return true;
    }
    return false;
}

function containsThreeVowels(strArr){
    let numberOfVowels = 0;
    for(let i = 0; i < strArr.length; i++){
        if(vowels.includes(strArr[i])) numberOfVowels++;
        if(numberOfVowels == 3) return true;
    }
    return false;
}

function doesNotContainForbiddenString(str){
    return (!str.includes('ab')) && (!str.includes('cd')) && (!str.includes('pq')) && (!str.includes('xy'));
}

function containsLetterBetweenSames(strArr){
    for(let i = 2; i < strArr.length; i++){
        if(strArr[i-2] == strArr[i]) return true;
    }
    return false;
}

function containsTwice2String(str){
    for(let i = 2; i < str.length; i++){
        const subStr = str.slice(i-2, i);
        const restStr = str.slice(i);
        if(restStr.includes(subStr)) return true; 
    }
    return false;
}

function determineNiceness(str){
    const strArr = str.split('');
    if(doesNotContainForbiddenString(str) && containsDoubleLetter(strArr) && containsThreeVowels(strArr)){
        part1NiceStrings++;
    }
    if(containsLetterBetweenSames(strArr) && containsTwice2String(str)){
        part2NiceStrings++;
    }
}

const words = extractWords();

for (let i = 0; i < words.length; i++){
    determineNiceness(words[i]);
}

console.log(`Result for part 1 is ${part1NiceStrings}`);
console.log(`Result for part 2 is ${part2NiceStrings}`);