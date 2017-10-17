#!/usr/bin/env node

import commander from 'commander';
import jsonDiff from '..';

commander
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => jsonDiff(firstConfig, secondConfig))
  .parse(process.argv);
