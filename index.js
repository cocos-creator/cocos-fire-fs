var Fs = require('fs');
var Path = require('path');
var Mkdirp = require('mkdirp');
var Rimraf = require('rimraf');
var FireFs = {};

/**
 * check if a given path exists
 * @method exists
 * @param {string} path
 * @param {function} callback
 */

function exists (path, callback) {
    Fs.stat(path, function (err) {
        callback(checkErr(err));
    });
}

FireFs.exists = exists;

/**
 * check if a given path exists, this is the sync version of FireFs.exists
 * @method existsSync
 * @param {string} path
 * @return {boolean}
 */
function existsSync(path) {
    try {
        Fs.statSync(path);
        return true;
    } catch (err) {
        return checkErr(err);
    }
}

FireFs.existsSync = existsSync;

//copy sync
function copySync ( src, dest ) {
    Fs.writeFileSync(dest, Fs.readFileSync(src));
}

function copySyncR ( src, dest ) {
    if ( Fs.statSync(src).isDirectory() ) {
        Fs.mkdirSync(dest);
        Fs.readdirSync(src).forEach(function(name) {
            copySyncR ( Path.join(src, name), Path.join(dest, name) );
        });
    }
    else {
        copySync ( src, dest );
    }
}

FireFs.makeTreeSync = function ( path, opts ) {
    Mkdirp.sync(path, opts);
};

FireFs.makeTree = function ( path, opts, cb ) {
    Mkdirp(path, opts, cb);
};

// a copy function just like bash's cp
FireFs.copySync = function ( src, dest ) {
    if ( existsSync(src) ) {
        if ( Fs.statSync(src).isDirectory() ) {
            if ( existsSync(dest) && Fs.statSync(dest).isDirectory() ) {
                copySyncR ( src, Path.join(dest, Path.basename(src)) );
            }
            else {
                FireFs.makeTreeSync(Path.dirname(dest));
                copySyncR ( src, dest );
            }
        }
        else {
            if ( existsSync(dest) && Fs.statSync(dest).isDirectory() ) {
                copySync ( src, Path.join(dest, Path.basename(src)) );
            }
            else {
                FireFs.makeTreeSync(Path.dirname(dest));
                copySync ( src, dest );
            }
        }
    }
};

// remove a directory recursively
FireFs.rimraf = Rimraf;

FireFs.rimrafSync = Rimraf.sync;

/**
* @function checkErr
* @param {Error|null} err The error value.
* @return {Boolean} A boolean representing if the file exists or not.
*/
function checkErr(err) {
    return err && err.code === "ENOENT" ? false : true;
}

/**
 * check if a given path exists and is a directory
 * @method isDir
 * @param {string} path
 * @param {function} callback
 */

FireFs.isDir = function (path, callback) {
    Fs.stat(path, function (err, stats) {
        if (err && err.code === "ENOENT") return callback(false);
        else {
            if (stats.isDirectory()) return callback(true);
            else return callback(false);
        }
    });
};

/**
 * check if a given path exists and is directory synchronously
 * @method isDirSync
 * @param {string} path
 * @return {boolean}
 */
FireFs.isDirSync = function (path) {
    try {
        var stats = Fs.statSync(path);
        if (stats.isDirectory()) return true;
        else return false;
    } catch (err) {
        return checkErr(err);
    }
};

//
var _ = {};
var prop;
for ( prop in Fs ) {
    _[prop] = Fs[prop];
}
for ( prop in FireFs ) {
    _[prop] = FireFs[prop];
}
module.exports = _;
