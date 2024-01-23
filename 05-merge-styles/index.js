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
          //   const newExtFile = path.extname(elementPath).substring(1);
          //   const nameFile = path.basename(elementPath, extFile);
          // elementPath - add folder path
          if (extFile === '.css') {
            readFile(elementPath);
            // const readStream = fs.createReadStream(elementPath, {
            //   encoding: 'utf8',
            // });

            // let writeStream = fs.createWriteStream(
            //   './05-merge-styles/project-dist/bundle.css',
            // );

            // readStream.on('data', (chunk) => {
            //   //   console.log(chunk.toString());
            //   //   writeStream.write(chunk);
            //   writeBundle(chunk);
            // });

            // fs.stat(elementPath, (err) => {
            //   if (err) {
            //     console.log(err);
            //   }
            // });
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
    console.log(chunk.toString());
    //   writeStream.write(chunk);
    writeBundle(elementPath, chunk);
  });
};

let writeBundle = (elementPath, chunk) => {
  fs.appendFile('./05-merge-styles/project-dist/bundle.css', chunk, (err) => {
    if (err) throw err;
  });
};

// const writeBundle = () => {
//   let writeStream = fs.createWriteStream(
//     './05-merge-styles/project-dist/bundle.css',
//   );

//   readStream.on('data', (chunk) => {
//     writeStream.write(chunk);
//   });
// };

readDirectory();
