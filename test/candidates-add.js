var patchsdp = require('..');
var test = require('tape');
var fs = require('fs');
var baseSdp = fs.readFileSync(__dirname + '/fragments/test-answer-nocandidates.txt', 'utf8');
var patcher;

test('create the patcher', function(t) {
  t.plan(2);
  t.ok(patcher = patchsdp(baseSdp), 'created');
  t.equal(typeof patcher.addCandidate, 'function', 'has addCandidate function');
});