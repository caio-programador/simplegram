const { execSync } = require('child_process');
const options = require('./stryker-options.conf');

const mutationRegex = /src\/main\/.*\.(vue|js)$/;

function listModifiedFiles(regexp) {
  const modifiedFiles = execSync('git ls-files -m', { encoding: 'UTF8' })
    .split('\n')
    .filter(fileName => !!fileName);
  return modifiedFiles.filter(fileName => regexp.test(fileName));
}

module.exports = function (config) {
  config.set({ ...options, mutate: listModifiedFiles(mutationRegex) });
};
