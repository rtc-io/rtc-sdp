var tools = require('./tools');

/**
  ### `constrain-bandwidth(value) => fn(sdp) => sdp`

  Create a filter function that can apply a `b=AS` line to the supplied SDP.

  <<< examples/constrain-bandwidth.js

**/
module.exports = function(value, mediaType) {
  return function(sdp) {
    var lines = tools.split(sdp);

    // remove existing b=AS lines
    lines = lines.filter(function(line) {
      return line.slice(0, 3) !== 'b=AS'
    });

    console.log(lines);

    return tools.join(lines);
  };
};
