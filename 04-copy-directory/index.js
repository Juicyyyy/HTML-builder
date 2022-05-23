const path = require('path');
const {readdir} = require('fs/promises');
const {copyFile} = require('fs/promises');
const {mkdir} = require('fs/promises');
const {rm} = require('fs/promises');

const dirPath = path.join(__dirname, 'files');
const dirCopyPath = path.join(__dirname, 'files-copy');

async function copyDir(dir, dirCopy) {
    const files = await readdir(dir, {withFileTypes: true});
    files.forEach(async function (item) {
      if (item.isFile()) {
        copyFile(dir + '\\' + item.name, dirCopy + '\\' + item.name);
      } else if (item.isDirectory()) {
        await mkdir(dirCopy + '\\' + item.name);
        await copyDir(dir + '\\' + item.name, dirCopy + '\\' + item.name);
      }
    });
}

(async function () {
    await rm(dirCopyPath, {recursive: true});
    await mkdir(dirCopyPath);
    copyDir(dirPath, dirCopyPath);
})();


