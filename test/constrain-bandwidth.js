var fs = require('fs');
var test = require('tape');
var constrainBW = require('../constrain-bandwidth');
var baseSdp = fs.readFileSync(__dirname + '/fragments/test-answer-nocandidates.txt', 'utf8');
var refSdp = [
  fs.readFileSync(__dirname + '/output/constrain-bandwidth-session.txt', 'utf8')
//   fs.readFileSync(__dirname + '/output/test-answer-addvideoice2.txt', 'utf8')
];

test('can add a bandwidth constraint to the session line', function(t) {
  t.plan(1);
  t.equal(constrainBW(128)(baseSdp), refSdp[0]);
});
