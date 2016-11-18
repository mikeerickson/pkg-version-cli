let childProcess = require('child_process');
let assert       = require('assert');
var pkgInfo      = require('../package.json');

describe('pkg-version-cli', () => {
	it('should execute CLI without error', (done) => {
		childProcess.execFile('./cli.js',[],{cwd: process.env.PWD}, (error, stdout) => {
			if (error) { throw error }
      let compare = pkgInfo.name + ' v' + pkgInfo.version + '\n';
			assert(stdout === compare);
			done();
		})
	});
});
