import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';
import compare from './compare';

const optimizeIni = config => _.reduce(config, (acc, value, key) => {
  if (value instanceof Object) {
    return { ...acc, [key]: optimizeIni(value) };
  }
  if (key.includes('.')) {
    return { ...acc, [key.slice(0, key.indexOf('.'))]: { [key.slice(key.indexOf('.') + 1)]: value } };
  }
  return { ...acc, [key]: value };
}, {});

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': config => optimizeIni(ini.parse(config)),
};

export default (firstConfigPath, secondConfigPath) => {
  const firstConfig = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfig = fs.readFileSync(secondConfigPath, 'utf8');
  const format = path.extname(firstConfigPath);
  const firstConfigContent = parsers[format](firstConfig);
  const secondConfigContent = parsers[format](secondConfig);
  return compare(firstConfigContent, secondConfigContent);
};
