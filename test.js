const fs = require('fs');
const path = require('path');

const app = require('./main.js');

const directoryPath = './';
const TOCFilename = 'indepth.md';

describe('listMarkdownFiles', () => {
  beforeAll(() => {
    // Create test directory and files
    fs.mkdirSync('testDir');
    fs.writeFileSync('testDir/test1.md', '# Test 1');
    fs.writeFileSync('testDir/test2.md', '# Test 2');
    fs.writeFileSync('testDir/test3.md', 'No markdown header');
    fs.writeFileSync('testDir/test with spaces.md', '# Test with spaces');
  });

  afterAll(() => {
    // Remove test directory and files
    fs.unlinkSync('testDir/test1.md');
    fs.unlinkSync('testDir/test2.md');
    fs.unlinkSync('testDir/test3.md');
    fs.unlinkSync('testDir/test with spaces.md');
    fs.unlinkSync(TOCFilename);
    fs.rmdirSync('testDir');
  });

  test('generateMarkdownList() should return a list of markdown files in a directory', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });

  test('generateMarkdownList() should not include files without a markdown header', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });

  test('generateMarkdownList() should use the first markdown header as the link title', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [Test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });

  test('generateMarkdownList() should use the file name if there is no markdown header', async () => {
    const expected = ['- [Test 1](test1.md)', '- [Test 2](test2.md)', '- [test3.md](test3.md)', '- [test with spaces](test%20with%20spaces.md)'];
    await app.listMarkdownFiles();
    const actual = fs.readFileSync(TOCFilename, 'utf8').split('\n').map(x => x.trim());
    expect(actual).toEqual(expected);
  });
});
