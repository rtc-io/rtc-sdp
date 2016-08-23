var parse = require('..');
var test = require('tape');
var fs = require('fs');
var baseSdp = fs.readFileSync(__dirname + '/fragments/test-answer-nocandidates.txt', 'utf8');
var refSdp = [
  fs.readFileSync(__dirname + '/output/test-answer-addvideoice1.txt', 'utf8').replace(/\n/g, '\r\n'),
  fs.readFileSync(__dirname + '/output/test-answer-addvideoice2.txt', 'utf8').replace(/\n/g, '\r\n')
];
var sdp;

test('parse the sdp', function(t) {
  t.plan(1);
  t.ok(sdp = parse(baseSdp), 'created');
});

test('can add 1 icecandidate to the sdp', function(t) {
  t.plan(1);
  sdp.addIceCandidate({
    sdpMLineIndex: 1,
    sdpMid: 'video',
    candidate: 'a=candidate:897777206 1 tcp 1509957375 192.168.1.198 0 typ host generation 0'
  });
  t.pass('line added');
});

test('generated sdp matches expected output (1 video candidate)', function(t) {
  t.plan(1);
  t.equal(sdp.toString(), refSdp[0], 'ok');
});

test('can add an icecandidate to the sdp', function(t) {
  t.plan(1);
  sdp.addIceCandidate({
    sdpMLineIndex: 1,
    sdpMid: 'video',
    candidate: 'a=candidate:897777206 2 tcp 1509957374 192.168.1.198 0 typ host generation 0'
  });
  t.pass('line added');
});

test('generated sdp matches expected output (2 video candidates)', function(t) {
  t.plan(1);
  t.equal(sdp.toString(), refSdp[1], 'ok');
});
