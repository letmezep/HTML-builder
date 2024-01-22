const fs = require('fs');
const path = require('path');
// let pathP = path.join(__dirname, '../02-write-file/text.txt');
const dirPath = path.join(__dirname, './files/');
const copyDirPath = path.join(__dirname, './files-copy/');

async function removeFiles() {
  const res = await fs.readdir(
    dirPath,
    { withFileTypes: true },
    (error, files) => {
      if (error) {
        console.log('Error in reading contents');
        console.log(error.message);
      } else {
        files.forEach((element) => {
          // const elementPath = path.resolve(__dirname, dirPath + element.name);
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

async function removeDirectory() {
  const res = await fs.rmdir('./04-copy-directory/files-copy/', (err) => {
    if (err) {
      console.log('REMOVE MISTAKE!!!');
    } else {
      console.log('DIRECTORY DELETED!');
    }
  });
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
  let a = await removeFiles();
  let b = await removeDirectory();
  let c = await makeDirectory();
  // let d = await readDirectory();
}

copyDir();

// let removeDir = () => {
//   fs.rm('./04-copy-directory/files-copy/', { recursive: true }, (err) => {
//     if (err) {
//       console.log('REMOVE MISTAKE!!!');
//     } else {
//       console.log('DIRECTORY DELETED!');
//     }
//   });
//   console.log('removeDir complete!');
// };


// let makeDirectory = () => {
//   fs.mkdir('./04-copy-directory/files-copy/', { recursive: true }, (err) => {
//     // fs.mkdir('./04-copy-directory/files-copy/', (err) => {
//     if (err) {
//       return console.log('MAKE MISTAKE!!!');
//     } else {
//       console.log('MAKE: ');
//     }
//   });
// };

// let readDirectory = () => {
//   // removeDir();
//   // makeDirectory();
//   fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//     if (error) {
//       console.log('Error in reading contents');
//       console.log(error.message);
//     } else {
//       files.forEach((element) => {
//         const elementPath = path.resolve(__dirname, dirPath + element.name);
//         const copyElementPath = path.resolve(
//           __dirname,
//           copyDirPath + element.name,
//         );
//         fs.copyFile(elementPath, copyElementPath, (err) => {
//           if (err) {
//             console.log('Error: ', err);
//           } else {
//             console.log('COPY: ');
//           }
//         });
//       });
//     }
//   });
//   // console.log('DIRECTORY READEN!');
// };

// async function copyDir() {
//   let a = await removeFiles();
//   let b = await removeDirectory();
//   let c = await makeDirectory();
//   let d = await readDirectory();
// }

// copyDir();
// makeDirectory();
// fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//   if (error) {
//     console.log('Error in reading contents');
//     console.log(error.message);
//   } else {
//     files.forEach((element) => {
//       const elementPath = path.resolve(__dirname, dirPath + element.name);
//       const copyElementPath = path.resolve(
//         __dirname,
//         copyDirPath + element.name,
//       );
//       fs.unlink(copyElementPath, () => {
//         console.log('DELETE FILES');
//       });
//     });
//   }
// });

// async function removeDirectory() {
//   const res = await fs.rmdir('./04-copy-directory/files-copy/', (err) => {
//     if (err) {
//       console.log('REMOVE MISTAKE!!!');
//     } else {
//       console.log('DIRECTORY DELETED!');
//     }
//   });
//   return res;
// }

// removeDirectory();

// fs.rmdir('./04-copy-directory/files-copy/', (err) => {
//   if (err) {
//     console.log('REMOVE MISTAKE!!!');
//   } else {
//     console.log('DIRECTORY DELETED!');
//   }
// });
// fs.rm('./04-copy-directory/files-copy/', (err) => {
//   if (err) {
//     console.log('REMOVE MISTAKE!!!');
//   } else {
//     console.log('DIRECTORY DELETED!');
//   }
// });
// console.log('removeDir complete!');

// async function makeDirectory() {
//   const make = await fs.mkdir(
//     './04-copy-directory/files-copy/',
//     { recursive: true },
//     (err) => {
//       if (err) {
//         console.log('MAKE MISTAKE!!!');
//       } else {
//         console.log('MAKE: ');
//       }
//     },
//   );
//   return make;
// }
// makeDirectory();

// fs.mkdir('./04-copy-directory/files-copy/', { recursive: true }, (err) => {
//   if (err) {
//     console.log('MAKE MISTAKE!!!');
//   } else {
//     console.log('MAKE: ');
//   }
// });

// fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//   fs.readdir(copyDirPath, (error, files) => {
//     if (error) {
//       console.log('Error in reading contents');
//       console.log(error.message);
//     } else {
//       files.forEach((element) => {
//         const elementPath = path.resolve(__dirname, dirPath + element.name);
//         const copyElementPath = path.resolve(
//           __dirname,
//           copyDirPath + element.name,
//         );
//         // fs.unlink(copyElementPath, () => {});
//       });
//     }
//   });
// });

// let removeDir = () => {
//   fs.rm(copyDirPath, { force: true, recursive: true }, () => {});
//   console.log('DIRECTORY DELETED!');
// };
// removeDir();

// let removeDir = () => {
// fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
// fs.readdir(copyDirPath, (error, files) => {
// if (error) {
//   console.log('Error in reading contents');
//   console.log(error.message);
// } else {
// files.forEach((element) => {
//   // const elementPath = path.resolve(__dirname, dirPath + element.name);
//   const copyElementPath = path.resolve(
//     __dirname,
//     copyDirPath + element.name,
//   );
//   fs.unlink(copyElementPath, () => {});
// });
// }
// fs.rm(copyDirPath, { recursive: true }, () => {});
// });

// };
//-----------------------------------------------------------------
// let makeDirectory = () => {
//   fs.mkdir(copyDirPath, { recursive: true }, (err) => {
//     if (err) {
//       return console.error(err);
//     } else {
//       console.log('MAKE: ');
//     }
//   });
// };
// //-----------------------------------------------------------------------------------
// let readDirectory = () => {
//   // removeDir();
//   // makeDirectory();
//   fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//     if (error) {
//       console.log('Error in reading contents');
//       console.log(error.message);
//     } else {
//       files.forEach((element) => {
//         const elementPath = path.resolve(__dirname, dirPath + element.name);
//         const copyElementPath = path.resolve(
//           __dirname,
//           copyDirPath + element.name,
//         );
//         fs.copyFile(elementPath, copyElementPath, (err) => {
//           if (err) {
//             console.log('Error: ', err);
//           } else {
//             console.log('COPY: ');
//           }
//         });
//       });
//     }
//   });
//   // console.log('DIRECTORY READEN!');
// };
// fs.rmdir('./04-copy-directory/files-copy/', (err) => {
//   if (err) {
//     console.log('REMOVE MISTAKE!!!');
//   } else {
//     console.log('DIRECTORY DELETED!');
//   }
// });

// readDirectory();
// makeDirectory();
// readDirectory();
// // removeDir();
// makeDirectory();
// readDirectory();

// const copyDir = () => {
//   readDirectory();
//   makeDirectory();
// };

// copyDir();
// fs.rm(copyDirPath, { recursive: true }, () => {});
// const fs = require('fs');
// // const { fsPromises } = require('node:fs/promises');
// // const fsPromises = require('fs').promises;
// // const rmdir = require('node:fs/promises');
// const { mkdir } = require('node:fs/promises');

// const { join } = require('node:path');
// const path = require('path');

// const dirPath = path.join(__dirname, './files/');
// const copyDirPath = path.join(__dirname, './files-copy/');

// async function makeDirectory() {
//   const projectFolder = join(__dirname, 'files-copy');
//   const dirCreation = await mkdir(projectFolder, { recursive: true });
//   return dirCreation;
// }

// fs.readdir(dirPath, { withFileTypes: true }, (error, files) => {
//   if (error) {
//     console.log('Error in reading contents');
//     console.log(error.message);
//   } else {
//     files.forEach((element) => {
//       const elementPath = path.resolve(__dirname, dirPath + element.name);
//       const copyElementPath = path.resolve(
//         __dirname,
//         copyDirPath + element.name,
//       );
//       fs.copyFile(elementPath, copyElementPath, (err) => {
//         if (err) {
//           console.log('Error: ', err);
//         }
//       });
//     });
//   }
// });

// // async function removeDir() {
// //   try {
// //     fsPromises.rmdir(copyDirPath, { recursive: true, force: true });
// //   } catch (err) {
// //     console.log(err);
// //   }
// // }

// const copyDir = () => {
//   // removeDir();

//   makeDirectory().catch(console.error);
//   console.log('function copyDir ready to RUN');
// };

// fs.rm(copyDirPath, { recursive: true }, () => {});
// copyDir();
