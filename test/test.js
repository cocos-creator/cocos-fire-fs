var FireFs = require('../index');
var Path = require('path');

function reset () {
    FireFs.rimrafSync("./test/foobar/");
    FireFs.copySync("./test/test-data/", "./test/foobar");
}

describe('FireFs', function () {
    describe('.exists()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function (done) {
            FireFs.exists(Path.join('./test', 'foobar', 'bar'), function(result) {
                result.should.eql(false);
                done();
            });
        });
        it('should return true when the path exists as a file', function (done) {
            FireFs.exists(Path.join('./test', 'foobar', 'foo_file'), function(result) {
                result.should.eql(true);
                done();
            });
        });
        it('should return true when the path exists as a directory', function (done) {
            FireFs.exists(Path.join('./test', 'foobar', 'foo_dir', 'bar_dir'), function(result) {
                result.should.eql(true);
                done();
            });
        });
    });
    describe('.existsSync()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'bar'))
                .should.eql(false);
        });
        it('should return true when the path exists as a directory', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'foo_dir'))
                .should.eql(true);
        });
        it('should return true when the path exists as a file', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'foo_file'))
                .should.eql(true);
        });
    });
    describe('.isDir()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function (done) {
            FireFs.isDir(Path.join('./test', 'foobar', 'bar'), function(err, result) {
                result.should.eql(false);
                done();
            });
        });
        it('should return false when the path exists as a file', function (done) {
            FireFs.isDir(Path.join('./test', 'foobar', 'foo_file'), function(err, result) {
                result.should.eql(false);
                done();
            });
        });
        it('should return true when the path exists as a directory', function (done) {
            FireFs.isDir(Path.join('./test', 'foobar', 'foo_dir', 'bar_dir'), function(err, result) {
                result.should.eql(true);
                done();
            });
        });
        it('should return false when the path parameter is undefined, null or empty string', function (done) {
            var count = 3;
            function countDone () {
                --count;
                if ( count === 0 ) {
                    done();
                }
            }

            FireFs.isDir(undefined, function(err, result) {
                result.should.eql(false);
                countDone();
            });
            FireFs.isDir(null, function(err, result) {
                result.should.eql(false);
                countDone();
            });
            FireFs.isDir("", function(err, result) {
                result.should.eql(false);
                countDone();
            });
        });
    });
    describe('.isDirSync()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function () {
            FireFs.isDirSync(Path.join('./test', 'foobar', 'bar'))
                .should.eql(false);
        });
        it('should return false when the path exists as a file', function () {
            FireFs.isDirSync(Path.join('./test', 'foobar', 'foo_file'))
                .should.eql(false);
        });
        it('should return true when the path exists as a directory', function () {
            FireFs.isDirSync(Path.join('./test', 'foobar', 'foo_dir', 'bar_dir'))
                .should.eql(true);
        });
        it('should return false when the path parameter is undefined, null or empty string', function () {
            FireFs.isDirSync(undefined).should.eql(false);
            FireFs.isDirSync(null).should.eql(false);
            FireFs.isDirSync("").should.eql(false);
        });
    });
});
