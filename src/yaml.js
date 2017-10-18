import fs from 'fs';
import yaml from 'js-yaml';

export default (firstConfigPath, secondConfigPath) => {
  const firstConfigContentStr = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfigContentStr = fs.readFileSync(secondConfigPath, 'utf8');
  const firstConfigContent = yaml.safeLoad(firstConfigContentStr);
  const secondConfigContent = yaml.safeLoad(secondConfigContentStr);
  return [firstConfigContent, secondConfigContent];
};
