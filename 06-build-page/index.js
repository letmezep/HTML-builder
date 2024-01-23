const fs = require('fs');
// const path = require('path');
const pathDir = './06-build-page/project-dist/';
const pathTemplate = './06-build-page/template.html';
const pathHtml = pathDir + 'index.html';
let changeTemplate = '';

async function createDirectory() {
  const res = await fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) {
      return console.log('MAKE MISTAKE!!!');
    } else {
      console.log('MAKE: ');
    }
  });
  return res;
}

let readFile = () => {
  const readStream = fs.createReadStream(pathTemplate, {
    encoding: 'utf8',
  });
  readStream.on('data', (chunk) => {
    // console.log(chunk.toString());

    if (chunk.includes('{{header}}' || '{{articles}}' || '{{footer}}')) {
      const changeTemplateHeader = chunk.replace(
        '{{header}}',
        'WOODY WOODPECKER ONE header',
      );
      const changeTemplateArticles = changeTemplateHeader.replace(
        '{{articles}}',
        'WOODY WOODPECKER ONE articles',
      );
      changeTemplate = changeTemplateArticles.replace(
        '{{footer}}',
        'WOODY WOODPECKER ONE footer',
      );
      console.log(changeTemplate);
    }
    writeHtml(changeTemplate);
    return changeTemplate;
  });
};

let writeHtml = (chunk) => {
  fs.appendFile(pathHtml, chunk, (err) => {
    if (err) throw err;
  });
};

readFile();
createDirectory();
