const fs = require('fs');
const path = require('path');
const pathDir = './06-build-page/project-dist/';
const pathTemplate = './06-build-page/template.html';
const pathComponents = './06-build-page/components/';
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

async function readDirectory() {
  const res = await fs.readdir(
    pathComponents,
    { withFileTypes: true },
    (error, files) => {
      if (error) {
        console.log('Error in reading contents');
        console.log(error.message);
      } else {
        changeTag(files);
        // change tags
        // files.forEach((element) => {
        //   const elementPath = path.resolve(__dirname, pathComponents + element.name);
        //   const copyElementPath = path.resolve(
        //     __dirname,
        //     copyDirPath + element.name,
        //   );

        // });
      }
    },
  );
  return res;
}

let changeTag = (files) => {
  files.forEach((element) => {
    const elementPath = path.resolve(__dirname, pathComponents + element.name);
    const extFile = path.extname(elementPath);
    const nameFile = path.basename(elementPath, extFile);
    console.log('element.name: ', nameFile);
    console.log('elementPath: ', elementPath);
  });
};

let readFile = () => {
  const readStream = fs.createReadStream(pathTemplate, {
    encoding: 'utf8',
  });
  readStream.on('data', (chunk) => {
    if (chunk.includes('{{header}}' || '{{articles}}' || '{{footer}}')) {
      readDirectory();
      // read directory with components
      // regExr - file name
      // foreach elements read file, replace tags
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
