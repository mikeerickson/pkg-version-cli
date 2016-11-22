const childProcess = require('child_process');
const pkgInfo      = require('../package.json');
const chai         = require('chai');
const chalk        = require('chalk');

const expect = chai.expect;

describe(chalk.cyan.bold('==> pkg-version-cli'), () => {

	const filename = './cli.js';
	it('should execute CLI without error', () => {
		childProcess.execFile(filename,[],{cwd: process.env.PWD}, (error, stdout) => {
			if (error) { throw error; }
      let compare = pkgInfo.name + ' v' + pkgInfo.version;
			expect(stdout).to.contain(compare);
		});

	});

	it('should execute CLI and return error (invalid filename)', () => {
		childProcess.execFile(filename,['packke.json'],{cwd: process.env.PWD}, (error, stdout) => {
			if (error) { throw error; }
			let compare = pkgInfo.name + ' v' + pkgInfo.version;
			expect(stdout).to.contain('Unable to locate valid packke.json');
		});
	});

});
