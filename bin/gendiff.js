#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');

program
  .version(version)
  .description('Compares two configuration files and shows a difference');

program.parse(process.argv);
