import fs from 'fs';

export default (firstConfigPath, secondConfigPath) => {
  const firstConfigContentStr = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfigContentStr = fs.readFileSync(secondConfigPath, 'utf8');
  const firstConfigContent = JSON.parse(firstConfigContentStr);
  const secondConfigContent = JSON.parse(secondConfigContentStr);
  return [firstConfigContent, secondConfigContent];
};
