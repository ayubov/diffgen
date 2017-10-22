import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import { parse, renderDefault, renderToPlain, renderToJson } from './ast';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const formats = {
  plain: renderToPlain,
  json: renderToJson,
  default: renderDefault,
};

export default (firstConfigPath, secondConfigPath, outputFormat = 'default') => {
  const firstConfig = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfig = fs.readFileSync(secondConfigPath, 'utf8');
  const format = path.extname(firstConfigPath);
  const firstConfigContent = parsers[format](firstConfig);
  const secondConfigContent = parsers[format](secondConfig);
  return formats[outputFormat](parse(firstConfigContent, secondConfigContent));
};
