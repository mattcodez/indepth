const fs = require('fs').promises;
const path = require('path');

async function listMarkdownFiles() {
  const directoryPath = './';

  try {
    const files = await fs.readdir(directoryPath);
    const markdownFiles = files.filter((file) => path.extname(file) === '.md');
    console.log(markdownFiles);

    const currentDirectory = path.basename(process.cwd());
    const newFilePath = path.join(directoryPath, `${currentDirectory}.md`);

    const fileLinks = markdownFiles.map((file) => {
      const fileTitle = path.basename(file, '.md');
      return `- [${fileTitle}](${file})`;
    }).join('\n');

    await fs.writeFile(newFilePath, fileLinks, { flag: 'wx' });
    console.log(`File '${newFilePath}' has been created with the following links:\n${fileLinks}`);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
}

listMarkdownFiles();