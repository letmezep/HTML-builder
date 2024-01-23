const fs = require('fs');
// const path = require('path');
const pathDir = './06-build-page/project-dist/';

async function makeDirectory() {
  const res = await fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      return console.log('MAKE MISTAKE!!!');
    } else {
      console.log('MAKE: ');
    }
  });
  return res;
}

makeDirectory();
