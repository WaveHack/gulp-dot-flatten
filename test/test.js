'use strict';

const chai = require('chai')
    , dotFlatten = require('..')
    , expect = require('chai').expect
    , gulp = require('gulp');

chai.should();
chai.use(require('chai-fs'));

describe('gulp-dot-flatten', () => {

    it('should flatten the files', (done) => {

        gulp.src('test/fixtures/**/*.js')
            .pipe(dotFlatten())
            .pipe(gulp.dest('test/tmp'))
            .once('end', () => {
                expect('test/tmp').to.be.a.directory().with.files([
                    'Foo.Bar.js',
                    'Main.js',
                ]);

                expect('test/tmp/Main.js').to.be.a.file().with.contents.that.match(/require\('\.\/Foo\.Bar'\)/);

                done();
            });

    });

});
