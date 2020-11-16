const path = require('path');
const fs = require('fs');
const util = require('util');

const dataPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'mocks/user.json'
);

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const readFromLocal = readFile(dataPath);

module.exports = {
    readFromLocal,
    writeFile,
    dataPath,
};
