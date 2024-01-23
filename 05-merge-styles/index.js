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
          const newExtFile = path.extname(elementPath).substring(1);
          const nameFile = path.basename(elementPath, extFile);
          // elementPath - add folder path
          fs.stat(elementPath, (err, stats) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                nameFile + ' - ' + newExtFile + ' - ' + stats.size + 'b',
              );
            }
          });
        }
      });
    }
  });
};

readDirectory();
