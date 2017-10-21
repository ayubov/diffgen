import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import { parse, render } from './ast';

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
  return render(parse(firstConfigContent, secondConfigContent));
};
