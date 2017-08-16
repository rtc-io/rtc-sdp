var fs = require('fs');
var test = require('tape');
var constrainBW = require('../constrain-bandwidth');
var baseSdp = [
  fs.readFileSync(__dirname + '/fragments/test-answer-nocandidates.txt', 'utf8'),
  fs.readFileSync(__dirname + '/fragments/test-audio-video.txt', 'utf8')
];
var refSdp = [
  fs.readFileSync(__dirname + '/output/constrain-bandwidth-session.txt', 'utf8'),
  fs.readFileSync(__dirname + '/output/constrain-bandwidth-video.txt', 'utf8')
];

test('can add a bandwidth constraint to the session line', function(t) {
  t.plan(1);
  t.equal(constrainBW(128)(baseSdp[0]), refSdp[0]);
});

test('can replace video bandwidth constraint', function(t) {
    t.plan(1);
    t.equal(constrainBW(128, 'video')(baseSdp[1]), refSdp[1]);
});
