#!/usr/bin/env node
import { Command } from 'commander'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')

  .action((filepath1, filepath2, options) => {
    console.log(filepath1, filepath2, options.format)
  })

program.parse()
