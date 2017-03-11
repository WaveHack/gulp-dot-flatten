# gulp-dot-flatten

[![Build Status](https://travis-ci.org/WaveHack/gulp-dot-flatten.svg?branch=master)](https://travis-ci.org/WaveHack/gulp-dot-flatten)
[![Dependency Status](https://gemnasium.com/badges/github.com/WaveHack/gulp-dot-flatten.svg)](https://gemnasium.com/github.com/WaveHack/gulp-dot-flatten)
![Downloads](https://img.shields.io/npm/dm/gulp-dot-flatten.svg)
![NPM version](https://img.shields.io/node/v/gulp-dot-flatten.svg)
[![License](https://img.shields.io/npm/l/gulp-dot-flatten.svg)](https://opensource.org/licenses/MIT)

gulp-dot-flatten is a [gulp](https://github.com/gulpjs/gulp) plugin to recursively flatten JS files into a single directory.

## About


Will rewrite the following filenames when used with the [usage](#usage) example below:  

```
/build/Main.js
/build/Foo/Bar.js
/build/Foo/Bar/Baz.js
```

Into this:

```
/dist/Main.js
/dist/Foo.Bar.js
/dist/Foo.Bar.Baz.js
```

Any `require('./foo/bar')` will be rewritten into `require('./foo.bar')`.

This library is made specifically for usage with [Screeps](https://screeps.com/) due to its lack of directory support.

## Install

`npm install --save-dev gulp-dot-flatten`

## Usage

```js
var dotFlatten = require('gulp-dot-flatten');

gulp.task('flatten', () => {
    return gulp.src('./build/**/*.js')
        .pipe(dotFlatten())
        .pipe(gulp.dest('./dist'));
});
```

## Options

### dotFlatten(options)

#### options.stringFilter

Type: `Function`

Optional function in which the filename will pass through. Useful for things like forcing lowercase filenames, if desired.

Example:

```js
var dotFlatten = require('gulp-dot-flatten');

gulp.task('flatten', () => {
    return gulp.src('./build/**/*.js')
        .pipe(dotFlatten({
            stringFilter: (str) => str.toLowerCase()
        }))
        .pipe(gulp.dest('./dist'));
});
```


#### options.verbose

Type: `Boolean`  
Default: `false`

## Attribution

gulp-dot-flatten is based on the [inline library](https://github.com/screepers/screeps-typescript-starter/blob/master/libs/gulp-dot-flatten.js) of the same name found in the [Screeps TypeScript Starter Kit](https://github.com/screepers/screeps-typescript-starter).

Original authors and contributors:

- [resir014](https://github.com/resir014)
- [valerian](https://github.com/valerian)
- [ratuple](https://github.com/ratuple)
- [ags131](https://github.com/ags131)

## License

gulp-dot-flatten is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
