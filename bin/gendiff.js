#!/usr/bin/env node
import { createRequire } from 'module';
import commander from 'commander';
import gendiff from '../src/gendiff.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const { program } = commander;

program
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(gendiff(filepath1, filepath2)));

program.parse(process.argv);
