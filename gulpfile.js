const gulp   = require('gulp');
const eslint = require('gulp-eslint');
const mocha  = require('gulp-mocha');
const msg    = require('gulp-messenger');
const config = require('./gulp.config.js');
const todo   = require('gulp-todo');

gulp.task('eslint', () => {
  return gulp.src(config.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', () =>
  gulp.src(config.test.src, {read: false})
    .pipe(mocha())
    .once('error', () => {
      msg.error(msg.chalk.bold('==> Testing Failed...'));
    })
    .once('end', () => {
      msg.log(msg.chalk.green.bold('==> Testing Completed Successfully...'));
    })
);

gulp.task('todo', () =>{
  gulp.src(config.scripts.src)
    .pipe(todo())
    .pipe(gulp.dest('./'));
});

gulp.task('watch:eslint', ['eslint'], () => {
  msg.note('==> Watching ESLint Scripts');
  gulp.watch('./**/*.js', ['eslint']);
});

gulp.task('watch:test', ['test'], () => {
  msg.note('==> Watching Test Scripts');
  gulp.watch('./**/*.js', ['test']);
});

gulp.task('watch', ['watch:eslint','watch:test']);

gulp.task('default',['eslint','test']);
