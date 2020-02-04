const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rsync = require('gulp-rsync'); 

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

//deployment
gulp.task('deploy', function(){
  return gulp.src('_site/**')
    .pipe(rsync({
      root: '_site/',
      username: 'flucoma',
      hostname: 'flucoma',
      destination: '~/www',
      archive: true, 
      silent: false, 
      compress: true, 
      delete: false, 
      chmod: 'u=rwX,Dg=rX,Do=rX,Fg=r,Fu=r'
    }));
});
