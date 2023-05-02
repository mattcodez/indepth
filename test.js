const fs = require('fs');
const path = require('path');

const app = require('./main.js');

const directoryPath = './';
const TestDir = 'test-dir';
const TOCFilename = `${TestDir}.md`;

describe('listMarkdownFiles', () => {
  beforeAll(() => {
    // Create test directory and files
    fs.mkdirSync(`${TestDir}`);
    fs.writeFileSync(`${TestDir}/test1.md`, '# Test 1');
    fs.writeFileSync(`${TestDir}/test2.md`, '# Test 2');
    fs.writeFileSync(`${TestDir}/test3.md`, 'No markdown header');
    fs.writeFileSync(`${TestDir}/test with spaces.md`, '# Test with spaces');
    process.chdir(`${TestDir}`);
  });

  afterAll(() => {
    // Remove test directory and files
    // Remove test directory and files
    fs.unlinkSync('test1.md');
    fs.unlinkSync('test2.md');
    fs.unlinkSync('test3.md');
    fs.unlinkSync('test with spaces.md');
    fs.unlinkSync(TOCFilename);
    process.chdir('..');
    fs.rmdirSync(TestDir);
  });

  test('listMarkdownFiles() should return a list of markdown files in a directory', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });

  test('listMarkdownFiles() should not include files without a markdown header', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });

  test('listMarkdownFiles() should use the first markdown header as the link title', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [Test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });

  test('listMarkdownFiles() should use the file name if there is no markdown header', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [test3.md](test3.md)', '- [test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });
});
