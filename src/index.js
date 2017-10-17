import fs from 'fs';

export default (firstConfigPath, secondConfigPath) => {
  const firstConfigContentString = fs.readFileSync(firstConfigPath, 'utf8');
  const secondConfigContentString = fs.readFileSync(secondConfigPath, 'utf8');
  const firstConfigContentObject = JSON.parse(firstConfigContentString);
  const secondConfigContentObject = JSON.parse(secondConfigContentString);

  const newProperties = Object.keys(secondConfigContentObject)
    .filter(key => !Object.keys(firstConfigContentObject).includes(key))
    .reduce((acc, key) => ({ ...acc, [`+ ${key}`]: secondConfigContentObject[key] }), {});

  const totalDiffObj = Object.keys(firstConfigContentObject)
    .reduce((acc, key) => {
      if (firstConfigContentObject[key] === secondConfigContentObject[key]) {
        return { ...acc, [`  ${key}`]: firstConfigContentObject[key] };
      }
      if (!secondConfigContentObject[key]) {
        return { ...acc, [`- ${key}`]: firstConfigContentObject[key] };
      }
      return { ...acc, [`+ ${key}`]: secondConfigContentObject[key], [`- ${key}`]: firstConfigContentObject[key] };
    }, newProperties);

  const totalDiffStr = ['{', ...Object.keys(totalDiffObj).map(key => `${key}: ${totalDiffObj[key]}`), '}'].join('\n');

  console.log(totalDiffStr);
  return totalDiffStr;
};
