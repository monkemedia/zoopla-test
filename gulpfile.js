'use strict';

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	eslint = require('gulp-eslint'),
	sassLint = require('gulp-sass-lint'),
	sass = require('gulp-sass');

gulp.task('connect', function() {
	connect.server({
		port: 3001,
		root: 'app/src/',
		livereload: true,
	});
});

gulp.task('html', function () {
  	gulp.src('./app/src/*.html')
    	.pipe(connect.reload());
});

gulp.task('javascript', function () {
  	gulp.src('./app/src/scripts/*.js')
    	.pipe(connect.reload());
});

gulp.task('lint', function() {
	return gulp.src(['./app/src/scripts/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', function () {
  	return gulp.src('sass/*.scss')
	    .pipe(sassLint())
	    .pipe(sassLint.format())
	    .pipe(sassLint.failOnError())
});

gulp.task('sass', function () {
  	return gulp.src('./app/src/sass/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./app/src/css'))
    	.pipe(connect.reload());
});

gulp.task('watch', function () {
  	gulp.watch('./app/src/sass/**/*.scss', ['sass']);
  	gulp.watch('./app/src/*.html', ['html']);
  	gulp.watch('./app/src/scripts/*.js', ['lint']);
  	gulp.watch('./app/src/scripts/*.js', ['javascript']);
});

gulp.task('default', ['connect', 'watch', 'lint']);