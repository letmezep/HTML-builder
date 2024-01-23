const fs = require('fs');
let path = require('path');
const dirPath = path.join(__dirname, './styles/');

let readDirectory = () => {
  fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error in reading contents');
      console.log(error.message);
    } else {
      files.forEach((element) => {
        if (element.isFile()) {
          const elementPath = path.resolve(__dirname, dirPath + element.name);
          const extFile = path.extname(elementPath);
          if (extFile === '.css') {
            readFile(elementPath);
          }
        }
      });
    }
  });
};

let readFile = (elementPath) => {
  const readStream = fs.createReadStream(elementPath, {
    encoding: 'utf8',
  });
  readStream.on('data', (chunk) => {
    writeBundle(chunk);
  });
};

let writeBundle = (chunk) => {
  fs.appendFile('./05-merge-styles/project-dist/bundle.css', chunk, (err) => {
    if (err) throw err;
  });
};

fs.unlink('./05-merge-styles/project-dist/bundle.css', (error) => {
  if (error) return console.log(error);
});
readDirectory();
