const config = require('./gulp.config.js');
const eslint = require('gulp-eslint');
const gulp   = require('gulp');
const mocha  = require('gulp-mocha');
const msg    = require('gulp-messenger');
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

gulp.task('watch:eslint', ['eslint','todo'], () => {
  msg.note('==> Watching ESLint Scripts');
  gulp.watch('./**/*.js', ['eslint','todo']);
});

gulp.task('watch:test', ['test'], () => {
  msg.note('==> Watching Test Scripts');
  gulp.watch('./**/*.js', ['test','todo']);
});

gulp.task('watch', ['watch:eslint','watch:test']);

gulp.task('default',['eslint','test','todo']);
