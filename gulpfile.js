var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var jimp = require('gulp-jimp');
var image = require('gulp-image');
var package = require('./package.json')


var paths = {
    styles: 'src/sass/**/*.sass',
    templates: 'src/jade/*.jade',
    images: 'src/images/*',
    scripts: 'src/js/*.js',
    blurImages: 'src/images/*.header-bg.jpg',
    vendor: 'src/vendor/*'

}

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 1337
    })
})

gulp.task('blur', function() {
    gulp.src(paths.blurImages)
        .pipe(jimp({ blur: 10}))
        .pipe(rename({
            suffix: '.blur'
        }))
        .pipe(gulp.dest('./src/images/'))
})

gulp.task('images', function() {
    gulp.src(paths.images)
        .pipe(image())
        .pipe(gulp.dest('./build/images/'))
})
gulp.task('styles', function() {
    var processors = [
        autoprefixer(),
        require('postcss-fontpath'),
    ];
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());

})

gulp.task('templates', function() {
    var processors = [
        require('posthtml-bem')()
    ]

    gulp.src(paths.templates)
        .pipe(plumber())
        .pipe(jade({ pretty: true }))
        .pipe(posthtml(processors))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
})


gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
})

gulp.task('vendor', function() {
    gulp.src(paths.vendor)
        .pipe(gulp.dest('./build/vendor'))
        .pipe(connect.reload());
})

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.templates, ['templates']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('test', function() {

    console.log(package.dependencies)
})
gulp.task('default', ['connect', 'styles', 'templates', 'scripts', 'vendor',  'watch'])
