let childProcess = require('child_process');
var pkgInfo      = require('../package.json');
var chai         = require('chai')

var expect = chai.expect;

describe('pkg-version-cli', () => {
	it('should execute CLI without error', (done) => {
		childProcess.execFile('./cli.js',[],{cwd: process.env.PWD}, (error, stdout) => {
			if (error) { throw error }
      let compare = pkgInfo.name + ' v' + pkgInfo.version + '\n';
			expect(stdout).to.contain(compare);
			done();
		})
	});
});
