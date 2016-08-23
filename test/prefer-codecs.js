var fs = require('fs');
var test = require('tape');
var preferCodecs = require('../prefer-codecs');
var baseSdp = fs.readFileSync(__dirname + '/fragments/test-audio-video.txt', 'utf8');
var refSdp = [
  fs.readFileSync(__dirname + '/output/test-video-codec-preferences.txt', 'utf8').replace(/\n/g, '\r\n'),
  fs.readFileSync(__dirname + '/output/test-audio-codec-preferences.txt', 'utf8').replace(/\n/g, '\r\n')
];

test('can reorder the codec preferences for all media', function(t) {
  t.plan(1);
  var newSdp = preferCodecs([
    'H264/90000', 'VP9/90000', 'VP8/90000'
  ])(baseSdp);

  t.equal(newSdp, refSdp[0]);
});

test('can reorder the codec preferences for specified media', function(t) {
  t.plan(1);
  var newSdp = preferCodecs([
    'H264/90000', 'VP9/90000', 'VP8/90000'
  ], 'video')(baseSdp);

  t.equal(newSdp, refSdp[0]);
});

test('can reorder the codec preferences for media with imaginary codecs', function(t) {
  t.plan(1);
  var newSdp = preferCodecs([
    'H264/90000', 'VP9/90000', 'VP8/90000', 'RIO/14400'
  ])(baseSdp);

  t.equal(newSdp, refSdp[0]);
});

test('can reorder the codec preferences for audio using IANA codecs', function(t) {
  t.plan(1);
  var newSdp = preferCodecs([
    'DVI4/16000'
  ], 'audio')(baseSdp);

  t.equal(newSdp, refSdp[1]);
});
