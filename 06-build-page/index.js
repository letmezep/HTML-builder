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
  console.log('The END createDirectory');
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
      console.log(fileNameArray);
    }
  });
  console.log('The END readDirectory');
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

readTemplate = () => {
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
        changeTemplate = changeTemplate.replace(
          '{{' + name + '}}',
          data,
        );
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
  console.log(x);
};

let build = () => {
  createDirectory();
  readDirectory();
  readTemplate();
};

build();
// // async function getNameArray(files) {
// const getNameArray = (files) => {
//   files.forEach((element) => {
//     const elementPath = path.resolve(__dirname, pathComponents + element.name);
//     const extFile = path.extname(elementPath);
//     const nameFile = path.basename(elementPath, extFile);
//     fileNameArray.push(nameFile);
//     // console.log('nameFile ', nameFile);
//   });
// };

// // async function readDirectory() {
// let readDirectory = () => {
//   //   const resY = await fs.readdir(
//   const resY = fs.readdir(
//     pathComponents,
//     { withFileTypes: true },
//     (error, files) => {
//       if (error) {
//         console.log('Error in reading contents');
//         console.log(error.message);
//       } else {
//         getNameArray(files);
//         // console.log(fileNameArray);
//       }
//     },
//   );
//   console.log('The END readDirectory');
//   return resY;
// };

// let readTemplate = (name, componentText) => {
//   const pathTemplateFull = pathComponents + name + '.html';
//   fs.readFile(pathTemplateFull, 'utf8', (err, data) => {
//     if (err) {
//       console.log(err);
//     }

//     const tempData = data.replace(name, componentText);

//     fs.writeFile(pathHtml, tempData, 'utf8', (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//     console.log('NAME: ', name);
//   });
// };

// const build = () => {
//   createDirectory();
//   readDirectory();

//   fileNameArray.forEach((name) => {
//     // readTemplate(name, '-------------ONE LOVE');
//     console.log('NAME: ', name);
//   });

//   //   writeHtml(changeTemplate);
//   //   console.log(changeTemplate);
// };

// build();

// /*
// async function readTemplate() {
//   const readStream = fs.createReadStream(pathTemplate, {
//     encoding: 'utf8',
//   });
//   readStream.on('data', (chunk) => {
//     changeTemplate = chunk;
//     // console.log(changeTemplate);
//     let i = 0;
//     fileNameArray.forEach((name) => {
//       // console.log(changeTemplate);
//       i++;
//       console.log('i = ', i);
//       const readStream = fs.createReadStream(pathComponents + name + '.html', {
//         encoding: 'utf8',
//       });
//       readStream.on('data', (chunkReadStream) => {
//         // readComp = chunkReadStream.toString();
//         changeTemplate = changeTemplate.replace(
//           '{{' + name + '}}',
//           chunkReadStream,
//         );
//       });
//     });
//   });
//   console.log(changeTemplate);
//   return readStream;
// }

// // async function writeHtml(chunk) {
// let writeHtml = (chunk) => {
//   console.log(chunk);
//   //   const x = await fs.unlink(pathHtml, () => {});
//   const x = fs.unlink(pathHtml, () => {});
//   fs.appendFile(pathHtml, chunk, (err) => {
//     if (err) throw err;
//   });
//   //   console.log('writeHtml go');
//   return x;
// };
// */
// /*
// async function build() {
//   createDirectory();
//   readDirectory();
//   await readTemplate();
//   writeHtml(changeTemplate);
//   console.log(changeTemplate);
// }

// build();
// */
// /*
// const fs = require('fs');
// const path = require('path');
// const pathDir = './06-build-page/project-dist/';
// const pathTemplate = './06-build-page/template.html';
// const pathComponents = './06-build-page/components/';
// const pathHtml = pathDir + 'index.html';
// let changeTemplate = 'FOOOFOOOFOOO';
// let readComp = '';
// let fileNameArray = [];
// // let changeTemplateArray = [];
// // let changeCont = '';

// // async function createDirectory() {
// let createDirectory = () => {
//   //   const resX = await fs.mkdir(pathDir, { recursive: true }, (err) => {
//   const resX = fs.mkdir(pathDir, { recursive: true }, (err) => {
//     if (err) {
//       console.log('MAKE MISTAKE!!!');
//     }
//   });
//   console.log('The END createDirectory');
//   return resX;
// };

// async function getNameArray(files) {
//   await files.forEach((element) => {
//     const elementPath = path.resolve(__dirname, pathComponents + element.name);
//     const extFile = path.extname(elementPath);
//     const nameFile = path.basename(elementPath, extFile);
//     fileNameArray.push(nameFile);
//     // console.log('nameFile ', nameFile);
//   });
// }

// // async function readDirectory() {
// let readDirectory = () => {
//   //   const resY = await fs.readdir(
//   const resY = fs.readdir(
//     pathComponents,
//     { withFileTypes: true },
//     (error, files) => {
//       if (error) {
//         console.log('Error in reading contents');
//         console.log(error.message);
//       } else {
//         getNameArray(files);
//         console.log(fileNameArray);
//       }
//     },
//   );
//   console.log('The END readDirectory', resY);
//   return resY;
// };

// // async function readComponent() {
// //   const readStream = await fs.createReadStream(pathComponents, {
// //     encoding: 'utf8',
// //   });
// //   readStream.on('data', (chunk) => {
// //     changeCont = chunk;
// //   });
// //   return readStream;
// // }

// // let readComponent = (name) => {
// //   // async function readComponent(name) {
// //   //   const readStream = await fs.createReadStream(
// //   const readStream = fs.createReadStream(pathComponents + name + '.html', {
// //     encoding: 'utf8',
// //   });
// //   readStream.on('data', (chunk) => {
// //     // readComp = chunk.toString();
// //     // changeTemplate = .replace('{{' + name + '}}', 'CHANGE IT');
// //     // console.log(changeTemplate);
// //     // console.log('readComp', chunk);
// //     // console.log('readComp', chunk.toString());
// //     // return chunk.toString();
// //     return changeTemplate;
// //   });
// // };

// async function readTemplate() {
//   const readStream = fs.createReadStream(pathTemplate, {
//     encoding: 'utf8',
//   });
//   readStream.on('data', (chunk) => {
//     changeTemplate = chunk;
//     // console.log(changeTemplate);
//     let i = 0;
//     fileNameArray.forEach((name) => {
//       // console.log(changeTemplate);
//       i++;
//       console.log('i = ', i);
//       const readStream = fs.createReadStream(pathComponents + name + '.html', {
//         encoding: 'utf8',
//       });
//       readStream.on('data', (chunkReadStream) => {
//         // readComp = chunkReadStream.toString();
//         changeTemplate = changeTemplate.replace(
//           '{{' + name + '}}',
//           chunkReadStream,
//         );
//         // console.log(changeTemplate);
//         // writeHtml(changeTemplate);

//         // return changeTemplate.toString();
//         // console.log('chunkReadStream ===============', chunkReadStream);

//         // console.log(changeTemplate);
//       });
//       //   console.log(changeTemplate);
//       //   console.log('{{' + name + '}}');
//       //   readComponent(name);
//       //   changeTemplate = changeTemplate.replace('{{' + name + '}}', 'CHANGE IT');

//       // let x = readComponent(name);
//       // console.log('readComp X ', x);
//       //   console.log('{{' + name + '}}');
//     });
//     // console.log(changeTemplate);
//     // writeHtml(changeTemplate);-----------------------
//     // changeTemplate =
//     //   changeTemplate +
//     // changeTemplate = chunk.replace(
//     //   '{{' + 'header' + '}}',
//     //   'WOODY WOODPECKER ONE header',
//     // );
//     // changeTemplate = changeTemplate.replace(
//     //   '{{' + 'articles' + '}}',
//     //   'WOODY WOODPECKER ONE header',
//     // );
//     // changeTemplate = changeTemplate.replace(
//     //   '{{' + 'footer' + '}}',
//     //   'WOODY WOODPECKER ONE header',
//     // );
//     // console.log('changeTemplate', changeTemplate);
//     // writeHtml(changeTemplate);

//     //----------------------------------------------------------
//     // fileNameArray.forEach((name) => {
//     //     changeTemplate = '';
//     //   changeTemplate = chunk.replace(
//     //     '{{' + name + '}}',
//     //     'WOODY WOODPECKER ONE header',
//     //   );
//     //   changeTemplateArray.push(changeTemplate);
//     //   console.log('changeTemplateArray ', changeTemplateArray);
//     //   console.log('{{' + name + '}}');
//   });
//   console.log(changeTemplate);
//   // });
//   // if (chunk.includes('{{header}}' || '{{articles}}' || '{{footer}}')) {
//   //   const changeTemplateHeader = chunk.replace(
//   //     '{{header}}',
//   //     'WOODY WOODPECKER ONE header',
//   //   );
//   //   const changeTemplateArticles = changeTemplateHeader.replace(
//   //     '{{articles}}',
//   //     'WOODY WOODPECKER ONE articles',
//   //   );
//   //   changeTemplate = changeTemplateArticles.replace(
//   //     '{{footer}}',
//   //     'WOODY WOODPECKER ONE footer',
//   //   );
//   //   console.log(chunk);
//   // }

//   //   writeHtml(chunk);
//   //   writeHtml(changeTemplate);

//   //   });
//   //   writeHtml(changeTemplate);
//   //   console.log('changeTemplate', changeTemplate);
//   return readStream;
// }

// // async function writeHtml(chunk) {
// let writeHtml = (chunk) => {
//   console.log(chunk);
//   //   const x = await fs.unlink(pathHtml, () => {});
//   const x = fs.unlink(pathHtml, () => {});
//   fs.appendFile(pathHtml, chunk, (err) => {
//     if (err) throw err;
//   });
//   //   console.log('writeHtml go');
//   return x;
// };

// async function build() {
//   createDirectory();
//   readDirectory();
//   await readTemplate();
//   writeHtml(changeTemplate);
//   console.log(changeTemplate);
// }

// build();

// /*
// async function createDirectory() {
//   const res = await fs.mkdir(pathDir, { recursive: true }, (err) => {
//     if (err) {
//       return console.log('MAKE MISTAKE!!!');
//     }
//   });
//   return res;
// }

// let readDirectory = () => {
//   fs.readdir(pathComponents, { withFileTypes: true }, (error, files) => {
//     if (error) {
//       console.log('Error in reading contents');
//       console.log(error.message);
//     } else {
//       files.forEach((element) => {
//         const elementPath = path.resolve(
//           __dirname,
//           pathComponents + element.name,
//         );
//         const extFile = path.extname(elementPath);
//         const nameFile = path.basename(elementPath, extFile);
//         filenameArray.push(nameFile);
//         console.log('nameFile ', nameFile);
//         // console.log('filenameArray ', filenameArray);
//       });
//       console.log('filenameArray ', filenameArray);
//       // getFileName(files);
//       // change tags
//       // files.forEach((element) => {
//       //   const elementPath = path.resolve(__dirname, pathComponents + element.name);
//       //   const copyElementPath = path.resolve(
//       //     __dirname,
//       //     copyDirPath + element.name,
//       //   );

//       // });
//     }
//   });

//   return filenameArray;
// };

// // pathComponents
// // let readComponent = (files) => {
// //     files.forEach((element) => {
// //         const elementPath = path.resolve(__dirname, dirPath + element.name);
// //         const copyElementPath = path.resolve(
// //           __dirname,
// //           copyDirPath + element.name,
// //         );
// //         fs.copyFile(elementPath, copyElementPath, (err) => {
// //           if (err) {
// //             console.log('Error: ', err);
// //           }
// //         });
// //       });s
// // }

// // let getFileName = (files) => {
// //   files.forEach((element) => {
// //     const elementPath = path.resolve(__dirname, pathComponents + element.name);
// //     const extFile = path.extname(elementPath);
// //     const nameFile = path.basename(elementPath, extFile);
// //     filenameArray.push(nameFile);
// //   });
// //   changeHtml(filenameArray);
// // };

// // for (const name of filenameArray) {
// //   const change = chunk.replace(name, 'DONT WANNA BE WOODPECKER');
// //   const changeTemplateHeader = chunk.replace(
// //     '{{header}}',
// //     'WOODY WOODPECKER ONE header',
// //   );
// // }

// let changeHtml = (filenameArray) => {
//   console.log('changeHtml ');
//   for (const name of filenameArray) {
//     console.log('name: ', name);
//     // const change = chunk.replace(name, 'DONT WANNA BE WOODPECKER');
//     // const changeTemplateHeader = chunk.replace(
//     //   '{{header}}',
//     //   'WOODY WOODPECKER ONE header',
//     // );
//   }
//   //   for (const name of filenameArray) {
//   //     console.log(name);
//   //   }
//   //   for (let name of filenameArray) {
//   //     console.log('changeHtml ');
//   //   }
//   // filenameArray.forEach((name) => {
//   // console.log('changeHtml');
//   // console.log('{{' + `${element}` + '}}');
//   // const changeTemplateHeader = chunk.replace(
//   //     '{{' + `${element}` + '}}'
//   // )
// };

// async function readFile() {
//   const readStream = await fs.createReadStream(pathTemplate, {
//     encoding: 'utf8',
//   });
//   readStream.on('data', (chunk) => {
//     if (chunk.includes('{{header}}' || '{{articles}}' || '{{footer}}')) {
//       //   X = readDirectory();
//       //   console.log('X ', X);

//       // read directory with components+
//       // regExr - file name+
//       // foreach elements read file
//       // replace tags
//       //   changeHtml(filenameArray);
//       const changeTemplateHeader = chunk.replace(
//         '{{header}}',
//         'WOODY WOODPECKER ONE header',
//       );
//       const changeTemplateArticles = changeTemplateHeader.replace(
//         '{{articles}}',
//         'WOODY WOODPECKER ONE articles',
//       );
//       changeTemplate = changeTemplateArticles.replace(
//         '{{footer}}',
//         'WOODY WOODPECKER ONE footer',
//       );
//       //   console.log(changeTemplate);
//     }
//     writeHtml(changeTemplate);
//     return chunk;
//   });
// }

// let writeHtml = (chunk) => {
//   fs.appendFile(pathHtml, chunk, (err) => {
//     if (err) throw err;
//   });
// };

// async function build() {
//   await createDirectory();
//   const SHOWMETHEMONEY = await readFile();
//   console.log(SHOWMETHEMONEY);
// }

// build();

// // createDirectory();
// // readFile();
// */

// /*
// async function createDirectory() {
//   const res = await fs.mkdir(pathDir, { recursive: true }, (err) => {
//     if (err) {
//       return console.log('MAKE MISTAKE!!!');
//     }
//   });
//   return res;
// }

// let readDirectory = () => {
//   fs.readdir(pathComponents, { withFileTypes: true }, (error, files) => {
//     if (error) {
//       console.log('Error in reading contents');
//       console.log(error.message);
//     } else {
//       files.forEach((element) => {
//         const elementPath = path.resolve(
//           __dirname,
//           pathComponents + element.name,
//         );
//         const extFile = path.extname(elementPath);
//         const nameFile = path.basename(elementPath, extFile);
//         filenameArray.push(nameFile);
//         console.log('nameFile ', nameFile);
//         // console.log('filenameArray ', filenameArray);
//       });
//       console.log('filenameArray ', filenameArray);
//       // getFileName(files);
//       // change tags
//       // files.forEach((element) => {
//       //   const elementPath = path.resolve(__dirname, pathComponents + element.name);
//       //   const copyElementPath = path.resolve(
//       //     __dirname,
//       //     copyDirPath + element.name,
//       //   );

//       // });
//     }
//   });

//   return filenameArray;
// };

// // pathComponents
// // let readComponent = (files) => {
// //     files.forEach((element) => {
// //         const elementPath = path.resolve(__dirname, dirPath + element.name);
// //         const copyElementPath = path.resolve(
// //           __dirname,
// //           copyDirPath + element.name,
// //         );
// //         fs.copyFile(elementPath, copyElementPath, (err) => {
// //           if (err) {
// //             console.log('Error: ', err);
// //           }
// //         });
// //       });s
// // }

// // let getFileName = (files) => {
// //   files.forEach((element) => {
// //     const elementPath = path.resolve(__dirname, pathComponents + element.name);
// //     const extFile = path.extname(elementPath);
// //     const nameFile = path.basename(elementPath, extFile);
// //     filenameArray.push(nameFile);
// //   });
// //   changeHtml(filenameArray);
// // };

// // for (const name of filenameArray) {
// //   const change = chunk.replace(name, 'DONT WANNA BE WOODPECKER');
// //   const changeTemplateHeader = chunk.replace(
// //     '{{header}}',
// //     'WOODY WOODPECKER ONE header',
// //   );
// // }

// let changeHtml = (filenameArray) => {
//   console.log('changeHtml ');
//   for (const name of filenameArray) {
//     console.log('name: ', name);
//     // const change = chunk.replace(name, 'DONT WANNA BE WOODPECKER');
//     // const changeTemplateHeader = chunk.replace(
//     //   '{{header}}',
//     //   'WOODY WOODPECKER ONE header',
//     // );
//   }
//   //   for (const name of filenameArray) {
//   //     console.log(name);
//   //   }
//   //   for (let name of filenameArray) {
//   //     console.log('changeHtml ');
//   //   }
//   // filenameArray.forEach((name) => {
//   // console.log('changeHtml');
//   // console.log('{{' + `${element}` + '}}');
//   // const changeTemplateHeader = chunk.replace(
//   //     '{{' + `${element}` + '}}'
//   // )
// };

// async function readFile() {
//   const readStream = await fs.createReadStream(pathTemplate, {
//     encoding: 'utf8',
//   });
//   readStream.on('data', (chunk) => {
//     if (chunk.includes('{{header}}' || '{{articles}}' || '{{footer}}')) {
//       //   X = readDirectory();
//       //   console.log('X ', X);

//       // read directory with components+
//       // regExr - file name+
//       // foreach elements read file
//       // replace tags
//       //   changeHtml(filenameArray);
//       const changeTemplateHeader = chunk.replace(
//         '{{header}}',
//         'WOODY WOODPECKER ONE header',
//       );
//       const changeTemplateArticles = changeTemplateHeader.replace(
//         '{{articles}}',
//         'WOODY WOODPECKER ONE articles',
//       );
//       changeTemplate = changeTemplateArticles.replace(
//         '{{footer}}',
//         'WOODY WOODPECKER ONE footer',
//       );
//       //   console.log(changeTemplate);
//     }
//     writeHtml(changeTemplate);
//     return chunk;
//   });
// }

// let writeHtml = (chunk) => {
//   fs.appendFile(pathHtml, chunk, (err) => {
//     if (err) throw err;
//   });
// };

// async function build() {
//   await createDirectory();
//   const SHOWMETHEMONEY = await readFile();
//   console.log(SHOWMETHEMONEY);
// }

// build();

// // createDirectory();
// // readFile();
// */
