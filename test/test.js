'use strict';

const fs = require('../index');
const path = require('path');
const tap = require('tap');

function reset () {
  fs.removeSync("./test/foobar/");
  fs.copySync("./test/test-data/", "./test/foobar");
}

tap.test('fire-fs', t => {
  t.test('exists()', t => {

    t.beforeEach(done => {
      reset();
      done();
    });

    t.test('it should return false when the path does not exists', t => {
      fs.exists(path.join('./test', 'foobar', 'bar'), result => {
        t.equal(result, false);
        t.end();
      });
    });

    t.test('it should return true when the path exists as a file', t => {
      fs.exists(path.join('./test', 'foobar', 'foo_file'), result => {
        t.equal(result, true);
        t.end();
      });
    });

    t.test('it should return true when the path exists as a directory', t => {
      fs.exists(path.join('./test', 'foobar', 'foo_dir', 'bar_dir'), result => {
        t.equal(result, true);
        t.end();
      });
    });

    t.test('it should raised an TypeError when the path is undefined', t => {
      try {
        fs.exists( undefined, result => {} );
      } catch ( err ) {
        t.type(err, TypeError);
        t.end();
      }
    });

    t.test('it should return false when the path is null', t => {
      try {
        fs.exists( null, result => {});
      } catch ( err ) {
        t.type(err, TypeError);
        t.end();
      }
    });

    t.end();
  });

  t.test('existsSync()', t => {
    t.beforeEach(done => {
      reset();
      done();
    });

    t.test('it should return false when the path does not exists', t => {
      let result = fs.existsSync(path.join('./test', 'foobar', 'bar'));

      t.equal(result, false);
      t.end();
    });

    t.test('it should return true when the path exists as a directory', t => {
      let result = fs.existsSync(path.join('./test', 'foobar', 'foo_dir'));

      t.equal(result, true);
      t.end();
    });

    t.test('it should return true when the path exists as a file', t => {
      let result = fs.existsSync(path.join('./test', 'foobar', 'foo_file'));

      t.equal(result, true);
      t.end();
    });

    t.test('it should return false when the path under a file', t => {
      let result = fs.existsSync(path.join('./test', 'foobar', 'foo_file', 'hello_world.js'));

      t.equal(result, false);
      t.end();
    });

    t.test('it should return false when the path is null or undefined', t => {
      t.equal(fs.existsSync(), false);
      t.equal(fs.existsSync(null), false);
      t.end();
    });

    t.end();
  });

  t.test('isDir()', t => {
    t.beforeEach(done => {
      reset();
      done();
    });

    t.test('it should return false when the path does not exists', t => {
      fs.isDir(path.join('./test', 'foobar', 'bar'), (err, result) => {
        t.equal(result, false);
        t.end();
      });
    });

    t.test('it should return false when the path exists as a file', t => {
      fs.isDir(path.join('./test', 'foobar', 'foo_file'), (err, result) => {
        t.equal(result, false);
        t.end();
      });
    });

    t.test('it should return true when the path exists as a directory', t => {
      fs.isDir(path.join('./test', 'foobar', 'foo_dir', 'bar_dir'), (err, result) => {
        t.equal(result, true);
        t.end();
      });
    });

    t.test('it should return false when the path parameter is undefined, null or empty string', t => {
      let count = 3;
      function countDone () {
        --count;
        if ( count === 0 ) {
          t.end();
        }
      }

      fs.isDir(undefined, (err, result) => {
        t.equal(result, false);
        countDone();
      });
      fs.isDir(null, (err, result) => {
        t.equal(result, false);
        countDone();
      });
      fs.isDir('', (err, result) => {
        t.equal(result, false);
        countDone();
      });
    });

    t.end();
  });

  t.test('isDirSync()', t => {
    t.beforeEach(done => {
      reset();
      done();
    });

    t.test('it should return false when the path does not exists', t => {
      t.equal(fs.isDirSync(path.join('./test', 'foobar', 'bar')), false);
      t.end();
    });

    t.test('it should return false when the path exists as a file', t => {
      t.equal(fs.isDirSync(path.join('./test', 'foobar', 'foo_file')), false);
      t.end();
    });

    t.test('it should return true when the path exists as a directory', t => {
      t.equal(fs.isDirSync(path.join('./test', 'foobar', 'foo_dir', 'bar_dir')), true);
      t.end();
    });

    t.test('it should return false when the path parameter is undefined, null or empty string', t => {
      t.equal(fs.isDirSync(undefined), false);
      t.equal(fs.isDirSync(null), false);
      t.equal(fs.isDirSync(''), false);
      t.end();
    });

    t.end();
  });

  t.end();
});
