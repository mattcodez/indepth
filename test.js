const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

const directoryPath = './';

describe('listMarkdownFiles', () => {
  beforeAll(() => {
    exec('touch example.md example2.md example3.txt');
    fs.mkdirSync('test-dir');
    fs.writeFileSync('test-dir/test.md', '# Test file');
  });

  afterAll(() => {
    exec('rm example.md example2.md example3.txt');
    fs.rmdirSync('test-dir');
    fs.unlinkSync('test.md');
    fs.unlinkSync('test-dir/test.md');
  });

  it('should create a new markdown file with links to other markdown files in the current directory', async () => {
    await listMarkdownFiles();

    const currentDirectory = path.basename(process.cwd());
    const newFilePath = path.join(directoryPath, `${currentDirectory}.md`);

    const fileContents = await fs.readFile(newFilePath, 'utf-8');
    expect(fileContents).toContain(`# ${currentDirectory}`);
    expect(fileContents).toContain('- [example]');
    expect(fileContents).toContain('- [example2]');
    expect(fileContents).not.toContain('- [example3]');
    expect(fileContents).toContain('- [Test file]');
  });
});
