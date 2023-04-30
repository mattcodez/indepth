// get all *.md files in current directory
const fs = require('fs');
const path = require('path');

const directoryPath = './';

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    console.log('Unable to scan directory: ' + err);
    return;
  } 

  files.forEach(function(file) {
    if (path.extname(file) === '.md') {
      console.log(file);
    }
  });
});
// get name of current directory
// build MD with links based only on filename for now