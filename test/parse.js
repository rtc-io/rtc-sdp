var parse = require('..');
var test = require('tape');
var fs = require('fs');
var baseSdp = fs.readFileSync(__dirname + '/fragments/test-answer-nocandidates.txt', 'utf8');
var sdp;
var reTrailingNewline = /\r?\n$/;

test('parse the sdp', function(t) {
  t.plan(2);
  t.ok(sdp = parse(baseSdp), 'created');
  t.ok(typeof sdp.toString == 'function', 'valid sdp parser instance');
});

test('serialize the sdp back to a string', function(t) {
  t.plan(1);
  t.equal(sdp.toString(), baseSdp.replace(reTrailingNewline, ''), 'original sdp recreated successfully');
});