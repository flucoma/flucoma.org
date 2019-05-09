const gulp = require('gulp');
const postcss = require('gulp-postcss');

// process CSS
gulp.task('css', function () {
  return gulp.src('./_src/css/styles.css')
    .pipe(postcss())
    .pipe(gulp.dest('./css'));
});

// watching
gulp.task('watch:css', function() {
  return gulp.watch(['./_src/css/**/*.css'],
  gulp.series('css'));
});

gulp.task('watch', gulp.parallel('watch:css'));

// deafult task
gulp.task('default', gulp.parallel('watch'));

// build task
gulp.task('build', gulp.parallel('css'));
