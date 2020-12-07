#!/usr/bin/env node
import { createRequire } from 'module';
import commander from 'commander';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const { program } = commander;

program
  .version(version)
  .description('Compares two configuration files and shows a difference');

program.parse(process.argv);
