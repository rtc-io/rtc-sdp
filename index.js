/* jshint node: true */
'use strict';

var reLineBreak = /\n\r?/;

/**
  # rtc-patchsdp

  This is a utility module for patching sdp.

  ## Example Usage

  To be completed.

  ## Reference

**/
module.exports = function(sdp) {
  var lines = sdp.split(reLineBreak);
  var ops = {};

  // identify lines


  /**
    ### addCandidate(data) => sdp string

  **/
  ops.addCandidate = function(data) {

  };

  return ops;
};