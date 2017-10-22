#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

commander
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, commander.format)))
  .parse(process.argv);

