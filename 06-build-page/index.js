const fs = require('fs');
const path = require('path');
const pathDir = './06-build-page/project-dist/';
const pathTemplate = './06-build-page/template.html';
const pathComponents = './06-build-page/components/';
const pathHtml = pathDir + 'index.html';
let changeTemplate = 'FOOOFOOOFOOO';
// // let readComp = '';
let fileNameArray = [];
// // let changeTemplateArray = [];
// // let changeCont = '';

//create dir project-dist
let createDirectory = () => {
  const resX = fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      console.log('MAKE ME CREATE MISTAKE!!!');
    }
  });
//   console.log('The END createDirectory');
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
    //   console.log(fileNameArray);
    }
  });
//   console.log('The END readDirectory');
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

let build = () => {
  createDirectory();
  readDirectory();
  readTemplate();
};

build();
