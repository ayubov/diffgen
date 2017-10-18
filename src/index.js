import fs from 'fs';
import _ from 'lodash';

export default (firstConfigPath, secondConfigPath) => {
  const firstConfigContentStr = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfigContentStr = fs.readFileSync(secondConfigPath, 'utf8');
  const firstConfigContent = JSON.parse(firstConfigContentStr);
  const secondConfigContent = JSON.parse(secondConfigContentStr);

  const unionKeys = _.union(Object.keys(firstConfigContent), Object.keys(secondConfigContent));
  const totalDiffObj = unionKeys.reduce((acc, key) => {
    if (firstConfigContent[key] === secondConfigContent[key]) {
      return acc.concat(`  ${key}: ${firstConfigContent[key]}`);
    } if (!firstConfigContent[key]) {
      return acc.concat(`+ ${key}: ${secondConfigContent[key]}`);
    } if (!secondConfigContent[key]) {
      return acc.concat(`- ${key}: ${firstConfigContent[key]}`);
    }
    return acc.concat(`+ ${key}: ${secondConfigContent[key]}`, `- ${key}: ${firstConfigContent[key]}`);
  }, []);
  const totalDiffStr = ['{', ...totalDiffObj, '}'].join('\n');

  return totalDiffStr;
};
