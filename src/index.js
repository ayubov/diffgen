import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (firstConfigPath, secondConfigPath) => {
  const firstConfig = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfig = fs.readFileSync(secondConfigPath, 'utf8');
  const format = path.extname(firstConfigPath);
  const firstConfigContent = parsers[format](firstConfig);
  const secondConfigContent = parsers[format](secondConfig);

  const unionKeys = _.union(Object.keys(firstConfigContent), Object.keys(secondConfigContent));
  const totalDiffObj = unionKeys.reduce((acc, key) => {
    if (firstConfigContent[key] === secondConfigContent[key]) {
      return [...acc, `  ${key}: ${firstConfigContent[key]}`];
    } if (!firstConfigContent[key]) {
      return [...acc, `+ ${key}: ${secondConfigContent[key]}`];
    } if (!secondConfigContent[key]) {
      return [...acc, `- ${key}: ${firstConfigContent[key]}`];
    }
    return [...acc, `+ ${key}: ${secondConfigContent[key]}`, `- ${key}: ${firstConfigContent[key]}`];
  }, []);
  const totalDiffStr = ['{', ...totalDiffObj, '}'].join('\n');

  return totalDiffStr;
};
