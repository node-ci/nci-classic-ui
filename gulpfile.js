'use strict';

var gulp = require('gulp');

var less = require('gulp-less');
var gulpReactJade = require('gulp-react-jade-amd');
var mainBowerFiles = require('main-bower-files');
var jade = require('gulp-jade');
var defineModule = require('gulp-define-module');

gulp.task('common-jade', function() {
	return gulp.src('views/index.jade')
		.pipe(jade({client: true}))
		.pipe(defineModule('commonjs'))
		.pipe(gulp.dest('views/'));
});

gulp.task('react-jade', function() {
	return gulp.src('static/js/**/*.jade')
		.pipe(gulpReactJade())
		.pipe(gulp.dest('static/js/templates'));
});

gulp.task('less', function () {
	return gulp.src('static/css/index.less')
		.pipe(less('index.css'))
		.pipe(gulp.dest('./static/css'));
});

gulp.task('fonts', function() {
	return gulp.src(mainBowerFiles({filter: /.*fonts.*/i}))
		.pipe(gulp.dest('static/fonts/'));
});

gulp.task('develop', function() {
	gulp.watch('views/index.jade', ['common-jade']);
	gulp.watch('static/js/app/**/*.jade', ['react-jade']);
	gulp.watch('static/css/**/*.less', ['less']);
});

gulp.task('default', [
	'common-jade',
	'react-jade',
	'less',
	'fonts',
	'develop'
]);
