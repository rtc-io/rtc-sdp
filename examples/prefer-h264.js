var preferCodecs = require('../prefer-codecs');
var quickconnect = require('rtc-quickconnect');

// create a conference which attempts to use H264 by preference
var conference = quickconnect('https://switchboard.rtc.io', {
  room: 'sdpfilter-test',
  sdpfilter: preferCodecs(['H264/90000'], 'video')
});

conference.on('call:started', function(id) {
  console.log('call started with peer: ' + id);
});
