var parser = require('./index');
var tools = require('./tools');
var ianaCodecs = require('./iana-codecs');
var reRtpMap = /^rtpmap:([0-9]*)\s*([^\s]*)/ig;

/**

  ### `rtc-sdp/prefer-codecs`

  ```
  fn(value, mediaType?) => fn(sdp) => sdp`
  ```

  Create a filter function that will alter the codec order specified in a media description
  line

  <<< examples/prefer-codecs.js

  The above example modifies the SDP at the session level.  In cases where you
  need to apply a bandwidth constraint for a specific media type, you will need
  to specify the mediaType as part of the function call:

  <<< examples/constrain-bandwidth-video.js

**/

module.exports = function(desiredCodecs, mediaType) {

  // Build a codec definition lookup object from the IANA codec list
  var defaultCodecs = Object.keys(ianaCodecs).reduce(function(r, codec) {
    r[codec.toUpperCase()] = { num: ianaCodecs[codec], codec: codec };
    return r;
  }, {});

  // Converts rtpmap definitions to a codec lookup object
  function convertToCodecDefinition(r, line) {
    if (!line || line[0] !== 'a') return r;

    var result = reRtpMap.exec(line[1]);
    if (!result) return r;

    // Build the codec definition
    var codec = result[2];
    var typeNum = result[1];
    r[codec.toUpperCase()] = {
      num: typeNum,
      codec: codec
    }
    return r;
  }

  return function(sdp) {
    var reValidMedia = new RegExp(mediaType ? ('^m=' + mediaType) : '^m=');
    var parsed = parser(sdp);
    var mediaIds = parsed.getMediaIDs();

    // Go through and find relevant media lines, detect existing codec order and defined codecs, and update
    // as required
    mediaIds.forEach(function(idx, i) {
      var mediaLine = parsed.findLine('m', i);
      if (!mediaLine || !reValidMedia.test('m=' + mediaLine.def)) return;

      // Get the current codec preferences
      var mediaTokens = mediaLine.def.split(' ');
      var codecPreferences = mediaTokens.slice(3);
      // Get the current dynamic codec type definitions for this media
      var codecDefinitions = mediaLine.childlines.reduce(convertToCodecDefinition, {});

      // Build the new media line
      var newCodecOrder = [];
      desiredCodecs.forEach(function(desiredCodec) {
        var codecKey = desiredCodec.toUpperCase();
        var definition = codecDefinitions[codecKey] || defaultCodecs[codecKey];
        if (!definition) return;

        newCodecOrder.push(definition.num);
      });

      // Add in the remaining codecs in their original order
      codecPreferences.forEach(function(codecNum) {
        if (newCodecOrder.indexOf(codecNum) !== -1) return;
        newCodecOrder.push(codecNum);
      });

      // Build the new media line definition
      mediaLine.def = mediaTokens.slice(0, 3).concat(newCodecOrder).join(' ');
    });

    return parsed.toString();
  };
};
