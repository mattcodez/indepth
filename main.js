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

    const fileLinks = [];

    for (const file of markdownFiles) {
      const filePath = path.join(directoryPath, file);
      const fileContents = await fs.readFile(filePath, 'utf-8');
      const fileTitleMatch = fileContents.match(/^#\s+(.*)$/m);
      const fileTitle = fileTitleMatch ? fileTitleMatch[1] : path.parse(file).name;
      const escapedFileName = path.parse(filePath).name.replace(/ /g, '%20');
      const fileLink = `- [${fileTitle}](${escapedFileName}.md)`;
      fileLinks.push(fileLink);
    }

    const fileLinksString = fileLinks.join('\n');
    const fileContents = `# ${currentDirectory}\n\n${fileLinksString}`;

    await fs.writeFile(newFilePath, fileContents);
    console.log(`File '${newFilePath}' has been created with the following links:\n${fileLinksString}`);
  } catch (err) {
    console.log('Unable to scan directory: ' + err);
    console.error(err.stack);
  }
}

listMarkdownFiles();
module.exports = {
    listMarkdownFiles
  };