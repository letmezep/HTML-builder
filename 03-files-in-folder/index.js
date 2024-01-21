const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, './secret-folder');

fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log('Error in reading contents');
    console.log(error.message);
  } else {
    files.forEach((element) => {
      if (element.isFile()) {
        const elementPath = path.resolve(
          __dirname,
          './secret-folder/' + element.name,
        );
        const extFile = path.extname(elementPath);
        const newExtFile = path.extname(elementPath).substring(1);
        const nameFile = path.basename(elementPath, extFile);

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
