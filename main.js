// get all *.md files in current directory
const fs = require('fs').promises;
const path = require('path');

async function listMarkdownFiles() {
  const directoryPath = './';

  try {
    const files = await fs.readdir(directoryPath);
    files.forEach((file) => {
      if (path.extname(file) === '.md') {
        console.log(file);
      }
    });
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
}

listMarkdownFiles();
// get name of current directory
// build MD with links based only on filename for now