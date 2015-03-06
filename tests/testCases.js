//This will be ran in a child process

var test     = require('tape'),
  console    = require('../');

test('Sample test', function(t) {
  t.plan(2);
  console.log('test1-', 'hello');
  console.log('test2-', {foo : 'bar'}, 'beep');
  console.log('test3-', JSON.stringify({pet : 'cat', car : 'jeep'}, null, 4));
  t.ok(true, 'this will be true');
  t.notOk(false, 'falsify');
  t.end();
});