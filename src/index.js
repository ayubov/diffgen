import commander from 'commander';

export default () => {
  commander
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format')
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);
};
