var fs = require('fs');
var test = require('tape');
var baseSdp = fs.readFileSync(__dirname + '/fragments/test-media-types-firefox.txt', 'utf8');
var parse = require('..');
var sdp;

test('can parse the target sdp', function(t) {
  t.plan(1);
  t.ok(sdp = parse(baseSdp), 'created');
});

test('can determine that we have an audio and video line only in the sdp', function(t) {
  t.plan(1);
  t.deepEqual(sdp.getMediaTypes(), ['audio', 'video', 'application'], 'ok');
});

test('can determine the media ids that exist in the sdp', function(t) {
  t.plan(1);
  t.deepEqual(sdp.getMediaIDs(), ['sdparta_0', 'sdparta_1', 'sdparta_2'], 'ok');
});
