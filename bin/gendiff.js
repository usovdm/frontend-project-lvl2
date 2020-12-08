#!/usr/bin/env node
import { createRequire } from 'module';
import commander from 'commander';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const { program } = commander;

program
  .version(version)
  .arguments('[options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
