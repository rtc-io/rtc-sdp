/* jshint node: true */
'use strict';

var reLineBreak = /\n\r?/;

/**
  # rtc-patchsdp

  This is a utility module for patching sdp.

  ## Example Usage

  To be completed.
**/
module.exports = function(sdp, opts) {
  var lines = sdp.split(reLineBreak);

  console.log('got lines: ', sdp);
};