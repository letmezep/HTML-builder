const fs = require('fs');
let path = require('path');

let pathP = path.join(__dirname, '../01-read-file/text.txt');

const readStream = fs.createReadStream(pathP, {
  encoding: 'utf8',
});

readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
