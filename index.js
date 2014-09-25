var Fs = require('fs');
var Path = require('path');
var Mkdirp = require('mkdirp');

function _copySync ( src, dest ) {
    Fs.writeFileSync(dest, Fs.readFileSync(src));
}

function _copySyncR ( src, dest ) {
    if ( Fs.statSync(src).isDirectory() ) {
        Fs.mkdirSync(dest);
        Fs.readdirSync(src).forEach(function(name) {
            _copySyncR ( Path.join(src, name), Path.join(dest, name) );
        });
    }
    else {
        _copySync ( src, dest );
    }
}

var FireFs = {
    makeTreeSync: function ( path, opts ) {
        Mkdirp.sync(path, opts);
    },

    makeTree: function ( path, opts, cb ) {
        Mkdirp(path, opts, cb);
    },

    // a copy function just like bash's cp 
    copySync: function ( src, dest ) {
        if ( Fs.existsSync(src) ) {
            if ( Fs.statSync(src).isDirectory() ) {
                if ( Fs.existsSync(dest) && Fs.statSync(dest).isDirectory() ) {
                    _copySyncR ( src, Path.join(dest, Path.basename(src)) );
                }
                else {
                    FireFs.mkdirpSync(Path.dirname(dest));
                    _copySyncR ( src, dest );
                }
            }
            else {
                if ( Fs.existsSync(dest) && Fs.statSync(dest).isDirectory() ) {
                    _copySync ( src, Path.join(dest, Path.basename(src)) );
                }
                else {
                    FireFs.mkdirpSync(Path.dirname(dest));
                    _copySync ( src, dest );
                }
            }
        }
    },
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
