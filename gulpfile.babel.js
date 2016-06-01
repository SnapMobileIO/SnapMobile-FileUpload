'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import ngHtml2Js from 'gulp-ng-html2js';

function handleError(error) {
  gutil.log(gutil.colors.magenta(error.message));
  if (error.stack) { gutil.log(gutil.colors.cyan(error.stack)); }
  process.exit(1);
}

gulp.task('babel', function() {
  return gulp.src(['./src/fileUpload/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./dist/fileUpload'))
    .on('error', handleError);
});

gulp.task('htmlify', function() {
  return gulp.src('./src/fileUpload/*.html')
    .pipe(ngHtml2Js({
      moduleName: 'FileUploadModule',
      prefix: '/components/fileUpload/'
    }))
    .pipe(gulp.dest('./dist/fileUpload'))
    .on('error', handleError);
});

gulp.task('dist', ['babel', 'htmlify']);
