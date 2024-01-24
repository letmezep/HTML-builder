const fs = require('fs');
const path = require('path');
const pathDir = './06-build-page/project-dist/';
const pathTemplate = './06-build-page/template.html';
const pathComponents = './06-build-page/components/';
const pathHtml = pathDir + 'index.html';
let changeTemplate = 'FOOOFOOOFOOO';
let fileNameArray = [];

let createDirectory = () => {
  const resX = fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      console.log('MAKE ME CREATE MISTAKE!!!');
    }
  });
  return resX;
};

//read dir components and create filenameArray
let readDirectory = () => {
  fs.readdir(pathComponents, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error in reading contents');
      console.log(error.message);
    } else {
      getNameArray(files);
    }
  });
};

//create file name array
const getNameArray = (files) => {
  files.forEach((element) => {
    const elementPath = path.resolve(__dirname, pathComponents + element.name);
    const extFile = path.extname(elementPath);
    const nameFile = path.basename(elementPath, extFile);
    fileNameArray.push(nameFile);
  });
};

const readTemplate = () => {
  const readStream = fs.createReadStream(pathTemplate, {
    encoding: 'utf8',
  });
  readStream.on('data', (chunk) => {
    changeTemplate = chunk;
    fileNameArray.forEach((name) => {
      fs.readFile(pathComponents + name + '.html', 'utf8', (err, data) => {
        if (err) {
          console.log('MAKE ME READ FILE MISTAKE!!!');
        }
        changeTemplate = changeTemplate.replace('{{' + name + '}}', data);
        writeHtml(changeTemplate);
      });
    });
  });
};

const writeHtml = (x) => {
  fs.writeFile(pathHtml, x, 'utf8', (err) => {
    if (err) {
      console.log('YOU LOSE WRITE!');
    }
  });
};

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

let build = () => {
  createDirectory();
  readDirectory();
  readTemplate();
};

build();
