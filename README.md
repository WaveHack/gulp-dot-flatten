# gulp-dot-flatten

![Build Status](https://travis-ci.org/WaveHack/gulp-dot-flatten.svg?branch=master)
![NPM version](https://img.shields.io/npm/v/gulp-dot-flatten.svg)
[![License](https://img.shields.io/npm/l/gulp-dot-flatten.svg)](https://opensource.org/licenses/MIT)
[![Dependency Status](https://gemnasium.com/badges/github.com/WaveHack/gulp-dot-flatten.svg)](https://gemnasium.com/github.com/WaveHack/gulp-dot-flatten)
![Downloads](https://img.shields.io/npm/dm/gulp-dot-flatten.svg)

gulp-dot-flatten is a [gulp](https://github.com/gulpjs/gulp) plugin to recursively flatten JS files into a single directory.

## About


Will rewrite the following things when used with the [usage](#usage) code below:  

```
/build/Main.js
/build/Foo/Bar.js
/build/Foo/Bar/Baz.js
```

Into to this:

```
/dist/Main.js
/dist/Foo.Bar.js
/dist/Foo.Bar.Baz.js
```

Any `require('./something/something')` will be rewritten into `require('./something.something')`.

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

Function which passes through the rewritten filenames.

Example for lowercase filenames:

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
