#!/usr/bin/env node
'use strict';
const fs    = require('fs');
const meow  = require('meow');
const chalk = require('chalk');
const argv  = require('yargs').argv;
const path  = require('path');

const cli = meow(`
	Usages
	  $ package-version
   $ package-version <filename>

	Example
	  $ package-version
	    --> 0.0.1
`);

let filename = process.env.PWD + '/package.json';
if (argv._.length > 0) {
  filename = process.env.PWD + '/' + argv._[0];
}

console.log('');
if (fs.existsSync(filename)) {
  const pkgInfo = require(filename);
	if ((pkgInfo.name) && (pkgInfo.version)) {
    console.log(chalk.white.bold(`==> Package Information (${chalk.cyan(path.basename(filename))})`));
		console.log(`    ${chalk.green.bold(pkgInfo.name)} ${chalk.white.bold('v' + pkgInfo.version)}`);
	}
	else {
		console.error(chalk.red.bold(`==> Invalid ${chalk.white('name')} or ${chalk.white('version')} properties`));
	}
}
else {
  console.log(chalk.red.bold(`Unable to locate valid ${chalk.white.bold(path.basename(filename))}`));
}
console.log('');
