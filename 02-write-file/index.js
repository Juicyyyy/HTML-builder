const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

const { stdin, stdout, exit } = process;

stdout.write('Enter your message:\n');
stdin.on('data', chunk  => {
  if (chunk.toString().trim() === 'exit') {
      exit();
    }
  writeStream.write(chunk.toString());
});

process.on('exit', () =>{
    stdout.write('\nGoodbye!');
})

process.on('SIGINT', exit);