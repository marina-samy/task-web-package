const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")


var globs={
  html:"project/*.html",
  css:"project/css/*/.css",
  img:'project/pics/*',
  js:'project/js/*/.js'
}

const imagemin = require('gulp-imagemin');

function imgMinify() {
    return gulp.src(globs.img).pipe(imagemin()).pipe(gulp.dest('dist/images'));
}


exports.img = imgMinify


const htmlmin = require('gulp-htmlmin');
function minifyHTML() {
    return src(globs.html).pipe(htmlmin({ collapseWhitespace: true, removeComments: true })).pipe(gulp.dest('dist'))
}

exports.html = minifyHTML

const concat = require('gulp-concat');
const terser = require('gulp-terser');

function jsMinify() {
 
    return src(globs.js).pipe(concat('all.min.js')).pipe(terser()).pipe(dest('dist/assets/js'))
}
exports.js = jsMinify


var cleanCss = require('gulp-clean-css');
function cssMinify() {
    return src(globs.css).pipe(concat('style.min.css')).pipe(cleanCss()).pipe(dest('dist/assets/css'))
}
exports.css = cssMinify



function watchTask() {
    watch(globs.html,series(minifyHTML))
    watch(globs.js,series(jsMinify))
    watch(globs.css, series(cssMinify));
    watch(globs.img, series(imgMinify));
}
exports.default = series( parallel(imgMinify, jsMinify, cssMinify, minifyHTML),watchTask)