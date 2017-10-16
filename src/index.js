import commander from 'commander';
import fs from 'fs';

export default () => {
  commander
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format')
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);

  const [firstConfigPath, secondConfigPath] = commander.rawArgs.slice(-2);

  const genDiff = (firstPath, secondPath) => {
    const firstConfigContentString = fs.readFileSync(firstPath, 'utf8');
    const secondConfigContentString = fs.readFileSync(secondPath, 'utf8');
    const firstConfigContentObject = JSON.parse(firstConfigContentString);
    const secondConfigContentObject = JSON.parse(secondConfigContentString);

    const newProperties = Object.keys(secondConfigContentObject)
      .filter(key => !Object.keys(firstConfigContentObject).includes(key))
      .reduce((acc, key) => ({ ...acc, [`+ ${key}`]: secondConfigContentObject[key] }), {});

    const totalDiff = Object.keys(firstConfigContentObject)
      .reduce((acc, key) => {
        if (firstConfigContentObject[key] === secondConfigContentObject[key]) {
          return { ...acc, [`  ${key}`]: firstConfigContentObject[key] };
        }
        if (!secondConfigContentObject[key]) {
          return { ...acc, [`- ${key}`]: firstConfigContentObject[key] };
        }
        return { ...acc, [`+ ${key}`]: secondConfigContentObject[key], [`- ${key}`]: firstConfigContentObject[key] };
      }, newProperties);

    console.log(totalDiff);
  };

  genDiff(firstConfigPath, secondConfigPath);

  module.exports = genDiff;
};
