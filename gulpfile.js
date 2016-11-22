const gulp   = require('gulp');
const eslint = require('gulp-eslint');
const mocha  = require('gulp-mocha');

gulp.task('eslint', () => {
  return gulp.src(['./**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('tdd', () =>
    gulp.src('./test/**/*.js')
        .pipe(mocha())
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        })
);
gulp.task('watch:scripts', ['eslint','tdd'], () => {
  gulp.watch('./**/*.js', ['eslint','tdd']);
});
