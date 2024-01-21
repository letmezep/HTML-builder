// const fs = require('fs');

const path = require('path');
const pathP = path.join(__dirname, '../03-files-in-folder/');

console.log(pathP);

// const fs = require('fs');
// const writeStream = fs.createWriteStream(pathP);

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// console.log('Hello! Please enter the text: ');

// rl.on('line', (input) => {
//   writeStream.write(input);
//   if (input === 'exit') {
//     rl.close();
//   }
// });

// process.on('exit', () => console.log('Goodbay! Text was written in text.txt'));
