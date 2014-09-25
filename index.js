var Fs = require('fs');
var Path = require('path');
var Mkdirp = require('mkdirp');
var FireFs = {};

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
    if ( Fs.existsSync(src) ) {
        if ( Fs.statSync(src).isDirectory() ) {
            if ( Fs.existsSync(dest) && Fs.statSync(dest).isDirectory() ) {
                copySyncR ( src, Path.join(dest, Path.basename(src)) );
            }
            else {
                FireFs.makeTreeSync(Path.dirname(dest));
                copySyncR ( src, dest );
            }
        }
        else {
            if ( Fs.existsSync(dest) && Fs.statSync(dest).isDirectory() ) {
                copySync ( src, Path.join(dest, Path.basename(src)) );
            }
            else {
                FireFs.makeTreeSync(Path.dirname(dest));
                copySync ( src, dest );
            }
        }
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
