#!/usr/bin/env node
'use strict';
const fs    = require('fs');
const meow  = require('meow');
const chalk = require('chalk');

const cli = meow(`
	Usage
	  $ package-version

	Example
	  $ package-version
	  0.0.1
`);

const filename = process.env.PWD + '/package.json'
console.log('')
if (fs.existsSync(filename)) {
  const pkgInfo = require(filename);
	if ((pkgInfo.name) && (pkgInfo.version)) {
    console.log(chalk.white.bold('==> Package Information'));
		console.log(`    ${chalk.green.bold(pkgInfo.name)} ${chalk.white.bold('v' + pkgInfo.version)}`);
	}
	else {
		console.error(chalk.red.bold(`==> Invalid ${chalk.white('name')} or ${chalk.white('version')} properties`));
	}
}
else {
  console.error(chalk.red('Unable to locate valid `package.json`'));
}
console.log('')
