const fs = require('fs');
const path = require('path');
const pathDir = './06-build-page/project-dist/';
const pathTemplate = './06-build-page/template.html';
const pathComponents = './06-build-page/components/';
const assetsPath = './06-build-page/assets/';
const copyAssetsDirPath = './06-build-page/project-dist/assets/';
const pathHtml = pathDir + 'index.html';
const pathCss = pathDir + 'style.css';
let changeTemplate = 'FOOOFOOOFOOO';
let fileNameArray = [];

let createDirectory = () => {
  const resX = fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      console.log('createDirectory error: ');
      console.log(err);
    }
  });
  return resX;
};

//read dir components and create filenameArray
let readDirectory = () => {
  fs.readdir(pathComponents, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error in reading contents');
      console.log(error);
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
          console.log('Error readTemplate');
          console.log(err);
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
      console.log('writeHtml ERROR');
      console.log(err);
    }
  });
};

const dirStylePath = path.join(__dirname, './styles/');

let readStyleDirectory = () => {
  fs.access(pathCss, fs.F_OK, (err) => {
    if (!err) {
      fs.unlink(pathCss, (error) => {
        if (error) return console.log('readStyleDirectory ERROR: ', error);
      });
    }
  });

  fs.readdir(dirStylePath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error in reading contents');
      console.log(error);
    } else {
      files.forEach((element) => {
        if (element.isFile()) {
          const elementPath = path.resolve(
            __dirname,
            dirStylePath + element.name,
          );
          const extFile = path.extname(elementPath);
          if (extFile === '.css') {
            readStyleFile(elementPath);
          }
        }
      });
    }
  });
};

let readStyleFile = (elementPath) => {
  const readStream = fs.createReadStream(elementPath, {
    encoding: 'utf8',
  });
  readStream.on('data', (chunk) => {
    writeCss(chunk);
  });
};

let writeCss = (chunk) => {
  fs.appendFile(pathCss, chunk, (err) => {
    if (err) throw err;
  });
};

let makeAssetsDir = (newDir) => {
  fs.mkdir(newDir, { recursive: true }, (err) => {
    // async function makeAssetsDir(newDir) {
    //   const m = await fs.mkdir(newDir, { recursive: true }, (err) => {

    if (err) {
      console.log('makeAssetsDir ERROR ', err);
    }
  });
  //   return m;
};

let copyAssetsDir = (assetsPath, copyAssetsDirPath) => {
  fs.readdir(assetsPath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('copyAssetsDir ERROR');
      console.log(error);
    } else {
      // fs.copyFile(
      //     './06-build-page/assets/callme.txt',
      //         './06-build-page/project-dist/assets/callme.txt',
      //         () => {},
      //       );
      files.forEach((element) => {
        let elementPath = assetsPath + element.name;
        let copyElementPath = copyAssetsDirPath + element.name;
        if (element.isFile()) {
          fs.copyFile(elementPath, copyElementPath, (err) => {
            if (err) {
              console.log('Assets DIR copyFile ERROR');
              console.log(err);
            }
          });
        } else {
          makeAssetsDir(copyElementPath);
          elementPath += '/';
          copyElementPath += '/';
          copyAssetsDir(elementPath, copyElementPath);
        }
      });
    }
  });
};

let build = () => {
  //write html from template
  createDirectory();
  readDirectory();
  readTemplate();
  //CSS bundle
  readStyleDirectory();
  //copy assets

  copyAssetsDir(assetsPath, copyAssetsDirPath);
};

makeAssetsDir(copyAssetsDirPath);
build();
