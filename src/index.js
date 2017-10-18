import _ from 'lodash';
import parseJson from './json';
import parseYaml from './yaml';

export default (firstConfigPath, secondConfigPath) => {
  const format = firstConfigPath.slice(-4);
  const [firstConfigContent, secondConfigContent] = format === 'json' ?
    parseJson(firstConfigPath, secondConfigPath) : parseYaml(firstConfigPath, secondConfigPath);

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
