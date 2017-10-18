import fs from 'fs';
import _ from 'lodash';

export default (firstConfigPath, secondConfigPath) => {
  const firstConfigContentString = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfigContentString = fs.readFileSync(secondConfigPath, 'utf8');
  const firstConfigContentObject = JSON.parse(firstConfigContentString);
  const secondConfigContentObject = JSON.parse(secondConfigContentString);

  const unionKeys = _.union(Object.keys(firstConfigContentObject), Object.keys(secondConfigContentObject));
  const totalDiffObj = unionKeys.reduce((acc, key) => {
      if (firstConfigContentObject[key] === secondConfigContentObject[key]) {
          return acc.concat(`  ${key}: ${firstConfigContentObject[key]}`);
      } else if (!firstConfigContentObject[key]) {
          return acc.concat(`+ ${key}: ${secondConfigContentObject[key]}`);
      } else if (!secondConfigContentObject[key]) {
          return acc.concat(`- ${key}: ${firstConfigContentObject[key]}`);
      } else return acc.concat(`+ ${key}: ${secondConfigContentObject[key]}`, `- ${key}: ${firstConfigContentObject[key]}`);
      }, []);
  const totalDiffStr = ['{', ...totalDiffObj, '}'].join('\n');
  
  return totalDiffStr;
};
