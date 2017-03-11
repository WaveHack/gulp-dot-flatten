'use strict';

const gulp = require('gulp')
    , istanbul = require('gulp-istanbul')
    , mocha = require('gulp-mocha');

gulp.task('test', () => {
    return gulp.src('index.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', () => {
            return gulp.src('test/test.js')
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports({
                    reporters: [
                        'lcovonly',
                        'cobertura',
                        'html'
                    ]
                }));
        });
});
