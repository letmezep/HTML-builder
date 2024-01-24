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

const dirStylePath = path.join(__dirname, './styles/');

let readStyleDirectory = () => {
  fs.access(pathCss, fs.F_OK, (err) => {
    if (!err) {
      fs.unlink(pathCss, (error) => {
        if (error) return console.log(error);
      });
    }
  });
  console.log('readStyleDirectory!');

  fs.readdir(dirStylePath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error in reading contents');
      console.log(error.message);
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
    //   fs.appendFile('./05-merge-styles/project-dist/bundle.css', chunk, (err) => {
    if (err) throw err;
  });
};

let makeAssetsDir = (newDir) => {
  fs.mkdir(newDir, { recursive: true }, (err) => {
    // fs.mkdir('./04-copy-directory/files-copy/', (err) => {
    if (err) {
      return console.log('MAKE MISTAKE!!!');
    }
  });
};

let copyAssetsDir = (assetsPath, copyAssetsDirPath) => {
  // removeDir();
  // makeDirectory();
  fs.readdir(assetsPath, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log('Error in reading contents');
      console.log(error.message);
    } else {
      // fs.copyFile(
      //     './06-build-page/assets/callme.txt',
      //         './06-build-page/project-dist/assets/callme.txt',
      //         () => {},
      //       );
      files.forEach((element) => {
        let elementPath = assetsPath + element.name;
        let copyElementPath = copyAssetsDirPath + element.name;
        // console.log(element.name);
        // const elementPath = path.resolve(__dirname, assetsPath + element.name);
        // const copyElementPath = path.resolve(
        //   __dirname,
        //   copyAssetsDirPath + element.name,
        // );
        // console.log(copyAssetsDirPath);
        // fs.copyFile(elementPath, copyElementPath, (err) => {
        //   if (err) {
        //     // console.log('Error: ', err);
        //   }
        // });

        if (element.isFile()) {
          console.log('IS FILE ', element.name);

          fs.copyFile(elementPath, copyElementPath, (err) => {
            console.log('COPYING from ', elementPath, ' to ', copyElementPath);
            if (err) {
              console.log(err);
            }
          });
        } else {
          makeAssetsDir(copyElementPath);
          elementPath += '/';
          copyElementPath += '/';
          copyAssetsDir(elementPath, copyElementPath);

          console.log('assetsPath ', assetsPath);
          console.log('elementPath ', elementPath);
          console.log('copyElementPath', copyElementPath);

          //   fs.copyFile(
          //     './06-build-page/assets/callme.txt',
          //     './06-build-page/project-dist/assets/callme.txt',
          //     () => {},
          //   );
          //   fs.copyFile(elementPath, copyElementPath, (err) => {
          //     if (err) {
          //       console.log('Error: ', err);
        }
        //   });
        //   // } else {
        //   //   console.log('IS NOT A FILE ', element.name);
        //   //   let newDeepPath = assetsPath + element.name;
        //   //   copyAssetsDir(newDeepPath);
        //   //   console.log('newDeepPath ', newDeepPath);
        //   // }
        // }
      });
      //     copyAssetsDir(assetsPath + element.name)
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
