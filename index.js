'use strict';

const gutil = require('gulp-util')
    , path = require('path')
    , PluginError = require('gulp-util').PluginError
    , recast = require('recast')
    , through2 = require('through2');

module.exports = (opts) => {
    opts = opts || {};

    return through2.obj(function (chunk, enc, callback) {
        if (opts.verbose) {
            gutil.log(`>>> flattener starting file '${gutil.colors.cyan(path.dirname(chunk.relative) + path.sep + path.basename(chunk.path))}'`);
        }

        if (chunk.isDirectory() || chunk.isNull() || chunk.isStream()) {
            return callback();
        }

        try {
            chunk.contents = new Buffer(recast.print(recast.visit(recast.parse(chunk.contents.toString()), {
                visitCallExpression: function (filePath) {
                    this.traverse(filePath);

                    const node = filePath.node;

                    if ((node.callee.name !== 'require') || !node.arguments.length) {
                        return false;
                    }

                    const arg = node.arguments[0];
                    if (!((arg.type === 'Literal') && (arg.value[0] === '.'))) {
                        return false;
                    }

                    const value = path.posix.normalize(path.dirname(chunk.relative).split(path.sep).join(path.posix.sep) + '/./' + arg.value);
                    let result = ('./' + value.split('/').join('.'));

                    if (opts.stringFilter) {
                        result = opts.stringFilter(result);
                    }

                    if (opts.verbose) {
                        gutil.log(`> in file '${gutil.colors.cyan(path.dirname(chunk.relative) + path.sep + path.basename(chunk.path))}', flattened path '${gutil.colors.cyan(arg.value)}' into '${gutil.colors.cyan(result)}'`);
                    }

                    result = result.replace(/[.](ts|js)/g, '');
                    node.arguments[0] = (arg.raw.charAt(0) + result + arg.raw.charAt(0));
                },
            })).code);

            let relPath = path.dirname(chunk.relative).split(path.sep);
            relPath.push(path.basename(chunk.path));

            let newName = relPath.join('.');

            while (newName[0] === '.') {
                newName = newName.slice(1);
            }

            if (opts.stringFilter) {
                newName = opts.stringFilter(newName);
            }

            if (opts.verbose) {
                gutil.log(`>> flattened file '${gutil.colors.cyan(path.dirname(chunk.relative) + path.sep + path.basename(chunk.path))}' into '${gutil.colors.cyan(newName)}'`);
            }

            chunk.path = path.join(chunk.base, '', newName);

            this.push(chunk);

        } catch (e) {
            this.emit('error', new PluginError('gulp-dot-flatten', e));
        }

        return callback();
    });
};
