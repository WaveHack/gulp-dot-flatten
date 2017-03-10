# gulp-dot-flatten

gulp-dot-flatten is a [gulp](https://github.com/gulpjs/gulp) plugin to recursively flatten JS files into a single directory.

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
- [ratuple0](https://github.com/ratuple0)
- [ags131](https://github.com/ags131)

## License

gulp-dot-flatten is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
