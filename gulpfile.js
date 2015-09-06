var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var buildDeps = ['src/**/*.js'];

gulp.task('build', function () {
    return gulp.src(buildDeps)
        .pipe(concat('preview.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-min', function () {
    return gulp.src(buildDeps)
        .pipe(uglify())
        .pipe(concat('preview.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build', 'build-min']);