const fs = require('fs');
// const path = require('path');
const pathDir = './06-build-page/project-dist/';
const pathTemplate = './06-build-page/template.html';
const pathHtml = pathDir + 'index.html';

async function createDirectory() {
  const res = await fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      return console.log('MAKE MISTAKE!!!');
    } else {
      console.log('MAKE: ');
    }
  });
  return res;
}

let readFile = () => {
  const readStream = fs.createReadStream(pathTemplate, {
    encoding: 'utf8',
  });
  readStream.on('data', (chunk) => {
    console.log(chunk.toString());
    writeHtml(chunk);
    return chunk.toString();
  });
};

let writeHtml = (chunk) => {
  fs.appendFile(pathHtml, chunk, (err) => {
    if (err) throw err;
  });
};

readFile();
createDirectory();
