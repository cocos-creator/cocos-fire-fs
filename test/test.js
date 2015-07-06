var FireFs = require('../index');
var Path = require('path');
var Chai = require('chai');

var expect = Chai.expect;
Chai.should();

function reset () {
    FireFs.removeSync("./test/foobar/");
    FireFs.copySync("./test/test-data/", "./test/foobar");
}

describe('FireFs', function () {
    describe('.exists()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function (done) {
            FireFs.exists(Path.join('./test', 'foobar', 'bar'), function(result) {
                result.should.equal(false);
                done();
            });
        });
        it('should return true when the path exists as a file', function (done) {
            FireFs.exists(Path.join('./test', 'foobar', 'foo_file'), function(result) {
                result.should.equal(true);
                done();
            });
        });
        it('should return true when the path exists as a directory', function (done) {
            FireFs.exists(Path.join('./test', 'foobar', 'foo_dir', 'bar_dir'), function(result) {
                result.should.equal(true);
                done();
            });
        });
        it('should raised an TypeError when the path is undefined', function (done) {
            try {
                FireFs.exists( undefined, function (result) {} );
            } catch ( err ) {
                expect(err).to.be.instanceof(TypeError);
                done();
            }
        });
        it('should return false when the path is null', function (done) {
            try {
                FireFs.exists( null, function (result) {});
            } catch ( err ) {
                expect(err).to.be.instanceof(TypeError);
                done();
            }
        });
    });
    describe('.existsSync()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'bar'))
                .should.equal(false);
        });
        it('should return true when the path exists as a directory', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'foo_dir'))
                .should.equal(true);
        });
        it('should return true when the path exists as a file', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'foo_file'))
                .should.equal(true);
        });
        it('should return false when the path under a file', function () {
            FireFs.existsSync(Path.join('./test', 'foobar', 'foo_file', 'hello_world.js'))
                .should.equal(false);
        });
        it('should return false when the path is null or undefined', function () {
            FireFs.existsSync().should.equal(false);
            FireFs.existsSync(null).should.equal(false);
        });
    });
    describe('.isDir()', function() {
        beforeEach(function () {
            reset();
        });
        it('should return false when the path does not exists', function (done) {
            FireFs.isDir(Path.join('./test', 'foobar', 'bar'), function(err, result) {
                result.should.equal(false);
                done();
            });
        });
        it('should return false when the path exists as a file', function (done) {
            FireFs.isDir(Path.join('./test', 'foobar', 'foo_file'), function(err, result) {
                result.should.equal(false);
                done();
            });
        });
        it('should return true when the path exists as a directory', function (done) {
            FireFs.isDir(Path.join('./test', 'foobar', 'foo_dir', 'bar_dir'), function(err, result) {
                result.should.equal(true);
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
                result.should.equal(false);
                countDone();
            });
            FireFs.isDir(null, function(err, result) {
                result.should.equal(false);
                countDone();
            });
            FireFs.isDir("", function(err, result) {
                result.should.equal(false);
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
                .should.equal(false);
        });
        it('should return false when the path exists as a file', function () {
            FireFs.isDirSync(Path.join('./test', 'foobar', 'foo_file'))
                .should.equal(false);
        });
        it('should return true when the path exists as a directory', function () {
            FireFs.isDirSync(Path.join('./test', 'foobar', 'foo_dir', 'bar_dir'))
                .should.equal(true);
        });
        it('should return false when the path parameter is undefined, null or empty string', function () {
            FireFs.isDirSync(undefined).should.equal(false);
            FireFs.isDirSync(null).should.equal(false);
            FireFs.isDirSync("").should.equal(false);
        });
    });
});
