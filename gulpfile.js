
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pngquant = require('imagemin-pngquant'),
    stylelint = require('stylelint'),
    config = require('./stylelint.config.js');

// server connect
gulp.task('connect', function() {
    connect.server({
        name: 'Dev App',
        root: '.',
        livereload: true
    });
});

// style
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions', '> 2%', 'Firefox ESR'))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

gulp.task('copy-js', function() {
    gulp.src('src/js/*').pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('copy-img', function() {
    gulp.src('src/img/*').pipe(gulp.dest('dist/img/')) 
    .pipe(connect.reload()); 
});

// imagemin
gulp.task('compress-img', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'));
});

// fonts
gulp.task('font', function() {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
});

// js minfy
gulp.task('js', function () {
    gulp.src(['src/js/**/*'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['styles'])
    gulp.watch('src/img/*', ['copy-img']);
    gulp.watch('src/fonts/*', ['font']);
    gulp.watch('src/js/*', ['copy-js']);
});

gulp.task('default', ['styles', 'font', 'compress-img', 'js']);
gulp.task('dev', ['connect', 'copy-js', 'copy-img', 'styles', 'font', 'watch']);
