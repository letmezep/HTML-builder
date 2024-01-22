const fs = require('fs');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');
const path = require('path');

const dirPath = path.join(__dirname, './files/');
const copyDirPath = path.join(__dirname, './files-copy/');

async function makeDirectory() {
  const projectFolder = join(__dirname, 'files-copy');
  const dirCreation = await mkdir(projectFolder, { recursive: true });

  return dirCreation;
}

fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log('Error in reading contents');
    console.log(error.message);
  } else {
    console.log('MISSION COMPLETE');
    console.log(files);

    files.forEach((element) => {
      const elementPath = path.resolve(__dirname, dirPath + element.name);
      const copyElementPath = path.resolve(
        __dirname,
        copyDirPath + element.name,
      );
      fs.copyFile(elementPath, copyElementPath, (err) => {
        if (err) {
          console.log('Error: ', err);
        }
      });
    });
  }
});

const copyDir = () => {
  makeDirectory().catch(console.error);
  console.log('function copyDir ready to RUN');
};

copyDir();