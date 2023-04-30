const fs = require('fs').promises;
const path = require('path');

async function listMarkdownFiles() {
  const directoryPath = './';

  try {
    const files = await fs.readdir(directoryPath);
    const currentDirectory = path.basename(process.cwd());
    const newFilePath = path.join(directoryPath, `${currentDirectory}.md`);

    const markdownFiles = files.filter((file) => {
      return path.extname(file) === '.md' && file !== newFilePath;
    });

    console.log(markdownFiles);

    const fileLinks = markdownFiles.map((file) => {
      const fileTitle = path.basename(file, '.md');
      return `- [${fileTitle}](${file})`;
    }).join('\n');

    const fileContents = `# ${currentDirectory}\n\n${fileLinks}`;

    await fs.writeFile(newFilePath, fileContents);
    console.log(`File '${newFilePath}' has been created with the following links:\n${fileLinks}`);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
  }
}

listMarkdownFiles();
