var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    posthtml = require('gulp-posthtml'),
    csscomb = require('gulp-csscomb'),
    csso = require('gulp-csso'),
    connect = require('gulp-connect')
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');

var paths = {
    styles: 'src/sass/*.sass',
    templates: 'src/jade/*.jade',
}

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 1337
    })
})
gulp.task('sass', function() {
    gulp.src(paths.styles)
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

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

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.templates, ['templates']);
});


gulp.task('default', ['styles', 'templates', 'connect', 'watch'])
