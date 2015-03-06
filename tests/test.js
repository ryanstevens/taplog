var test     = require('tape'),
  spawn    = require('child_process').spawn,
  split    = require('split'),
  through2 = require('through2');


function runTest(testName, cb) {
  var output = [];
  var child = spawn('node', [testName], {cwd : __dirname});

  function addOutput(line, enc, cb) {
    output.push(line.toString());
    cb(); 
  }

  child.stdout
    .pipe(split())
    .pipe(through2(addOutput))
    .pipe(process.stdout);

  child.stderr
    .pipe(split())
    .pipe(through2(addOutput))
    .pipe(process.stderr);

  child.stdout.once('end', function(code) {
    cb(null, output);
  });
}

test('Prepends #', function(t) {
  t.plan(6);
  runTest('testCases', function(err, output) {
    var test3Line = 0;
    output.forEach(function(line) {
      console.log('CHILD:' + line);

      if (test3Line === 3) {
        t.equal(line, '#}');
        test3Line++
      }

      if (test3Line === 2) {
        t.ok(line.indexOf('"car": "jeep"') > 0);
        test3Line++
      }

      if (test3Line === 1) {
        t.ok(line.indexOf('"pet": "cat",') > 0);
        test3Line++
      }

      if (line.indexOf('test1')>0) t.equal(line, '#test1- hello');
      if (line.indexOf('test2')>0) t.equal(line, "#test2- { foo: 'bar' } beep");
      if (line.indexOf('test3')>0) { t.equal(line, '#test3- {'); test3Line++;}

    });
    t.end();
  });
});