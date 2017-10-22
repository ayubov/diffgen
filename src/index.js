import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import { parse, renderDefault, renderToPlain } from './ast';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (firstConfigPath, secondConfigPath, outputFormat) => {
  const firstConfig = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfig = fs.readFileSync(secondConfigPath, 'utf8');
  const format = path.extname(firstConfigPath);
  const firstConfigContent = parsers[format](firstConfig);
  const secondConfigContent = parsers[format](secondConfig);
  if (outputFormat === 'plain') {
    return renderToPlain(parse(firstConfigContent, secondConfigContent));
  }
  return renderDefault(parse(firstConfigContent, secondConfigContent));
};
