const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, './files/');
const copyDirPath = path.join(__dirname, './files-copy/');

async function removeFiles() {
  const res = await fs.readdir(
    copyDirPath,
    { withFileTypes: true },
    (error, files) => {
      if (error) {
        console.log('Error in reading contents');
        console.log(error.message);
      } else {
        files.forEach((element) => {
          const copyElementPath = path.resolve(
            __dirname,
            copyDirPath + element.name,
          );
          fs.unlink(copyElementPath, () => {
            console.log('DELETE FILES');
          });
        });
      }
    },
  );
  return res;
}

async function makeDirectory() {
  const res = await fs.mkdir(
    './04-copy-directory/files-copy/',
    { recursive: true },
    (err) => {
      // fs.mkdir('./04-copy-directory/files-copy/', (err) => {
      if (err) {
        return console.log('MAKE MISTAKE!!!');
      } else {
        console.log('MAKE: ');
      }
    },
  );
  return res;
}

async function readDirectory() {
  // removeDir();
  // makeDirectory();
  const res = await fs.readdir(
    dirPath,
    { withFileTypes: true },
    (error, files) => {
      if (error) {
        console.log('Error in reading contents');
        console.log(error.message);
      } else {
        files.forEach((element) => {
          const elementPath = path.resolve(__dirname, dirPath + element.name);
          const copyElementPath = path.resolve(
            __dirname,
            copyDirPath + element.name,
          );
          fs.copyFile(elementPath, copyElementPath, (err) => {
            if (err) {
              console.log('Error: ', err);
            } else {
              console.log('COPY: ');
            }
          });
        });
      }
    },
  );
  return res;
}

async function copyDir() {
  await removeFiles();
  await makeDirectory();
  await readDirectory();
}

copyDir();
