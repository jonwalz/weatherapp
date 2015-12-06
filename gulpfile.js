"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task("concatScripts",['compileSass'], function() {
    return gulp.src([
        'src/js/jquery.js',
        'src/js/main.js',
        'src/js/myApp.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("dist/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compileSass', function() {
  return gulp.src('src/scss/app.sass')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('watchSass', function() {
  gulp.watch('src/scss/**/app.sass', ['compileSass']);
})

gulp.task('clean-sass', function(){
  del(['dist/css/app.css*']);
});

gulp.task('clean', function() {
  del(['dist/css/app.css*', 'dist/js/app.js*', 'js/app.min.js']);
});

gulp.task("build", ['minifyScripts'], function() {
  return gulp.src(["css/app.css", "js/app.min.js",
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean", "build"]);
