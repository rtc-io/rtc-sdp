var tools = require('./tools');

/**

  ### `rtc-sdp/constrain-bandwidth`

  ```
  fn(value, mediaType?) => fn(sdp) => sdp`
  ```

  Create a filter function that can apply a `b=AS` line to the supplied SDP.

  <<< examples/constrain-bandwidth.js

  The above example modifies the SDP at the session level.  In cases where you
  need to apply a bandwidth constraint for a specific media type, you will need
  to specify the mediaType as part of the function call:

  <<< examples/constrain-bandwidth-video.js

**/
module.exports = function(value, mediaType) {
  return function(sdp) {
    var lines = tools.split(sdp);
    var lineRegex = new RegExp(mediaType ? ('^m=' + mediaType) : '^s=');
    var locations;

    // remove existing b=AS lines
    lines = lines.filter(function(line) {
      return line.slice(0, 3) !== 'b=AS'
    });

    // find the splice locations for the bandwidth lines
    locations = tools.locate(lineRegex, lines);

    // iterate through the locations and add the new b=AS lines
    locations.forEach(function(idx) {
      lines.splice(idx + 1, 0, 'b=AS:' + value);
    });

    return tools.join(lines);
  };
};
