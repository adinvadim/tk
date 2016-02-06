'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const posthtml = require('gulp-posthtml');
const csscomb = require('gulp-csscomb');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const jimp = require('gulp-jimp');
const image = require('gulp-image');
const gls = require('gulp-live-server');
const flatten = require('gulp-flatten');
const webpack = require('webpack');
const sourcemaps = require('gulp-sourcemaps');
const webpackConfig = require('./webpack.config.js');
const webpackConfigBuild = require('./webpack.build.config.js');
const argv = require('yargs')
    .boolean(['static'])
    .argv


const paths = {
    styles: ['app/blocks/**/*.{sass,scss}', 'src/css/**/*.css'],
    images: ['app/blocks/**/images/*', 'src/images/*', 'app/bundles/**/images/*'],
    scripts: ['app/blocks/**/*.js', 'app/bundles/**/*.js', 'src/js/**/*.js'],
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
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));

})
gulp.task('styles:build', function() {
    let processors = [
        autoprefixer(),
        cssnano(),
        require('postcss-fontpath'),
    ];
    gulp.src(['./app/blocks/main.sass', './app/blocks/admin.sass'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/css'));

})

gulp.task('vendor', function() {
    //gulp.src(paths.vendor)
        //.pipe(gulp.dest('./public/vendor'));
    return
})

gulp.task('watch', function() {

    let server = gls.new(`./app/${argv.static ? "staticApp.js" : "server.js"}`);
    server.start().then(function(result) {
        console.log(`Server exited with result ${result}`)
    })
    gulp.watch(paths.styles, ['styles', server.notify]);
    gulp.watch(paths.templates, [server.notify]);
    gulp.watch(paths.scripts, ['webpack', server.notify]);
    gulp.watch(paths.images, ['images', server.notify]);
    //gulp.watch(['./app/**/*.js'], [server.start.bind(server)]);
});

gulp.task('webpack', function () {
    webpack(webpackConfig, function (err, stats) {
        if (err) console.log(err)
        console.log(stats.toString({
            colors: true
        }));
    });
});

gulp.task('webpack:build', function () {
    webpack(webpackConfigBuild, function (err, stats) {
        if (err) console.log(err)
        console.log(stats.toString({
            colors: true
        }));
    });
});

gulp.task('build', ['styles:build', 'webpack:build', 'images', 'vendor'])
gulp.task('default', ['styles',  'webpack', 'watch'])
