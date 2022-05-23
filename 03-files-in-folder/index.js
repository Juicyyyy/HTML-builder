const path = require('path');
const {stat} = require('fs');
const {readdir} = require('fs/promises');

readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}).then(files => {
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(path.join(__dirname, 'secret-folder'), file.name);
        const fileInfo = path.parse(filePath);

        stat(path.join(path.join(__dirname, 'secret-folder'), file.name), (err, stats) => {
          console.log(fileInfo.name + ' - ' + path.extname(filePath).slice(1) + ' - ' + stats.size + ' byte');
        });
      }
    }
  });
