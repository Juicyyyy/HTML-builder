const path = require('path');
const fs = require('fs');
const {readdir} = require('fs/promises');

const writeFile = path.join(__dirname, 'project-dist', 'bundle.css');
const readFile = path.join(__dirname, 'styles');
const fullStyle = [];

const writeStream = fs.createWriteStream(writeFile);

async function getData(file) {
  const readStream = fs.createReadStream(file);
  for await (const chunk of readStream) {
    fullStyle.push(chunk);
  }
}

readdir(readFile, {withFileTypes: true}).then(async (item) => {
    for (let i = 0; i < item.length; i++) {
      const file = path.join(readFile, item[i].name);
      if (item[i].isFile() && path.extname(file) === '.css') {
        await getData(file);
      }
    }
    writeStream.write(fullStyle.join('\n').toString());
  });