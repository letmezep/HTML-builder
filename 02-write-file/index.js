const path = require('path');
let pathP = path.join(__dirname, '../02-write-file/text.txt');

const fs = require('fs');
const writeStream = fs.createWriteStream(pathP);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hello! Please enter the text: ');

rl.on('line', (input) => {
  writeStream.write(input);
  if (input === 'exit') {
    rl.close();
  }
});

process.on('exit', () => console.log('Goodbye! Text was written in text.txt'));
