const fs = require('fs');
// import fs from 'fs/promises';
const path = require('path');

const dirPath = path.join(__dirname, './secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log('Error in reading contents');
    console.log(error.message);
  } else {
    // let out = '';
    files.forEach((element) => {
      if (element.isFile()) {
        console.log(element);
      }
    });
    // console.log(out);
    // console.log('Contents are..');
    // console.log(files);
  }
});

// let allFiles = fs.readdirSync(dirPath, { withFileTypes: true });
// // let allFiles = await fs.readdirSync(dirPath, { withFileTypes: true });
// console.log(allFiles);

// try {
//   let allFiles = await fs.readdir(dirPath, { withFileTypes: true });
// } catch (err) {
//   console.log(err);
// }
// console.log(allFiles);

// // const { error } = require('console');
// const fs = require('fs');
// // import { readdir } from 'fs';

// const path = require('path');
// const dirPath = path.join(__dirname, './secret-folder');

// // const isFile = (fileName) => {
// //   return fs.lstatSync(fileName).isFile();
// // };

// // fs.readdirSync(dirPath)
// //   .map((fileName) => {
// //     return fs.path.join(dirPath, fileName);
// //   })
// //   .filter(isFile);

// // const isFile = (fileName) => {
// //   if (fs.lstat(fileName).isFile()) {
// //     console.log(fileName);
// //   }
// //   return fs.lstat(fileName).isFile();
// // };

// fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//   if (error) {
//     console.log('Error in reading contents');
//     console.log(error.message);
//   } else {
//     console.log('Contents are..');
//     console.log(files);
//   }
// });

// fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//     if (error) {
//       console.log('Error in reading contents');
//       console.log(error.message);
//     } else if(files.) {
//       console.log('Contents are..');
//       console.log(files);
//     }
//   });

// console.log('DIRENT: ', fs.Dirent);
// //   .map((fileName) => {
// //     return fs.path.join(dirPath, fileName);
// //   })
// //   .filter(isFile);

// // fs.readdir(dirPath, { withFileTypes: true })
// //   .map((fileName) => {
// //     return fs.path.join(dirPath, fileName);
// //   })
// //   .filter(isFile);

// // // console.log('Path to DIR: ', pathP);

// // fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
// //   if (error) {
// //     console.log('Error in reading contents');
// //     console.log(error.message);
// //   } else if (files.isFile()) {
// //     // fs.Dirent.filter((d) => d.isFile());
// //     // fs.Dirent.map((d) => d.name);
// //     console.log('Contents are..');
// //     console.log(files);
// // console.log('d.name: ', d.name);
// //   }
// // });

// // try {
// //     const files = await readdir(path);
// //     for (const file of files)
// //     console.log(file);
// // } catch (err) {
// //     console.error(err);
// // }

// // const fs = require('fs');
// // const writeStream = fs.createWriteStream(pathP);

// // const readline = require('readline');
// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// // });

// // console.log('Hello! Please enter the text: ');

// // rl.on('line', (input) => {
// //   writeStream.write(input);
// //   if (input === 'exit') {
// //     rl.close();
// //   }
// // });

// // process.on('exit', () => console.log('Goodbye! Text was written in text.txt'));

// // const fs = require('fs');
// // let path = require('path');

// // let pathP = path.join(__dirname, '../01-read-file/text.txt');

// // const readStream = fs.createReadStream(pathP, {
// //   encoding: 'utf8',
// // });

// // readStream.on('data', (chunk) => {
// //   console.log(chunk.toString());
// // });
