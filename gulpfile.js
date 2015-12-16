'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const csscomb = require('gulp-csscomb');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const jimp = require('gulp-jimp');
const image = require('gulp-image');
const gls = require('gulp-live-server');
const flatten = require('gulp-flatten')


const paths = {
    styles: ['app/blocks/**/*.sass', 'src/css/**/*.css'],
    images: ['app/blocks/**/images/*', 'src/images/*'],
    scripts: 'src/js/**/*.js',
    vendor: {
        css: 'src/vendor/**/*.css',
        js: 'src/vendor/**/*.js'
    }
}


gulp.task('blur', function() {
    gulp.src(paths.blurImages)
        .pipe(jimp({ blur: 10}))
        .pipe(rename({
            suffix: '.blur'
        }))
        .pipe(gulp.dest((file) => { return file.base }));
})

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(image())
        .pipe(flatten({ includeParents: 1} ))
        .pipe(gulp.dest('./public/images/'));
})
gulp.task('styles', function() {
    let processors = [
        autoprefixer(),
        require('postcss-fontpath'),
    ];
    gulp.src(['./app/blocks/main.sass', './app/blocks/admin.sass'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/css'));

})


gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(gulp.dest('./public/js'));
})

gulp.task('vendor', function() {
    //gulp.src(paths.vendor)
        //.pipe(gulp.dest('./public/vendor'));
    return
})

gulp.task('watch', function() {

    let server = gls.new('./app/server.js');
    server.start().then(function(result) {
        console.log(`Server exited with result ${result}`)
    })
    gulp.watch(paths.styles, ['styles', server.notify]);
    gulp.watch(paths.templates, [server.notify]);
    gulp.watch(paths.scripts, ['scripts', server.notify]);
    gulp.watch(paths.images, ['images', server.notify]);
    //gulp.watch(['./app/**/*.js'], [server.start.bind(server)]);
});

gulp.task('build', ['styles', 'scripts', 'images', 'blur', 'vendor', 'watch'])
gulp.task('default', ['styles', 'scripts', 'vendor', 'watch'])
