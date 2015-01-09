var constrainBandwidth = require('../constrain-bandwidth');
var quickconnect = require('rtc-quickconnect');

// create a conference with constrained bandwidth
var conference = quickconnect('https://switchboard.rtc.io', {
  room: 'sdpfilter-test',
  sdpfilter: constrainBandwidth(128)
});

conference.on('call:started', function(id) {
  console.log('call started with peer: ' + id);
});
