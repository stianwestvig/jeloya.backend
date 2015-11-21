var gulp = require('gulp');
var util = require('gulp-util');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var babelify = require("babelify");
var uglifyify = require("uglifyify");
var uglify = require("gulp-uglify");

var scss = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

// If production
var production = false;
var watch = false;

var handleError = function(err) {
    util.log(util.colors.red(err.message));
    util.beep();
    this.emit('end');
};

var sassSource = './src/dashboard/styles.scss';
var clientSource = './src/dashboard/main.js';
var imgSource = './src/dashboard/images/**/*';
var buildFolder = './src/dashboard/public/';

// Builds the javascript file using Browserify
// with the Babel(ify) transform for ES6 and React.js (JSX)
/*gulp.task('browserify', function() {

    var b = browserify({
        'debug': !production,
        'cache': {},
        'packageCache': {},
        'fullPaths': !production*//*,
         standalone: 'Components'*//*
    });

    if(watch) {
        b = watchify(b);
    }

    b.transform(babelify, {optional: ['react', 'es2015'], stage: 0});

    b.on('log', util.log);

    if(watch) {
        b.on('update', function() {
            bundle(b, 'app.js');
        });
    }

    b.add(clientSource);

    bundle(b, 'app.js');
});

function bundle(b, filename) {

    if(production) {

        b.bundle()
            .on('error', handleError)
            .pipe(source(filename))
            .pipe(streamify(uglify({
                mangle: true,
                compress: {
                    screw_ie8: true,
                    drop_console: production,
                    drop_debugger: production
                },
                preserveComments: 'license'
            })))
            .pipe(gulp.dest(buildFolder));

    } else {

        b.bundle()
            .on('error', handleError)
            .pipe(source(filename))
            .pipe(gulp.dest(buildFolder));
    }
}*/

function buildSCSS() {

    gulp.src(sassSource)
        .on('error', handleError)
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulp.dest(buildFolder));
}

gulp.task('scss', function() {

    buildSCSS();

    if(watch) {
        gulp.watch('./src/**/*.scss', buildSCSS);
    }
});

function copyImages() {
    gulp.src(imgSource)
        .pipe(gulp.dest(buildFolder + 'images/'));
}

// Copy all static images
gulp.task('images', function() {

    copyImages();

    if(watch) {
        gulp.watch(imgSource, copyImages);
    }
});

function copyFonts() {
    gulp.src(fontSource)
        .pipe(gulp.dest(buildFolder + 'fonts/'));
}

gulp.task('fonts', function() {

    copyFonts();

    if(watch) {
        gulp.watch(fontSource, copyFonts);
    }
});

gulp.task('setGlobals', function() {
    production = (process.env.NODE_ENV === 'production');
});

gulp.task('enableWatch', function() {
    watch = true;
});

// Build
gulp.task('build', ['setGlobals', 'scss', 'images']);

// Watch and build
gulp.task('watch', ['enableWatch', 'build']);

// Watch and build
gulp.task('default', ['watch']);