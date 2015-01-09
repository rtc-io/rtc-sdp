/* jshint node: true */
'use strict';

var nub = require('whisk/nub');
var pluck = require('whisk/pluck');
var flatten = require('whisk/flatten');
var reLineBreak = /\r?\n/;
var reTrailingNewlines = /\r?\n$/;

// list sdp line types that are not "significant"
var nonHeaderLines = [ 'a', 'c', 'b', 'k' ];
var parsers = require('./parsers');

/**
  # rtc-sdp

  This is a utility module for intepreting and patching sdp.

  ## Example Usage

  To be completed.

  ## Reference

**/
module.exports = function(sdp) {
  var ops = {};
  var parsed = [];
  var activeCollector;

  // initialise the lines
  var lines = sdp.split(reLineBreak).filter(Boolean).map(function(line) {
    return line.split('=');
  });

  var inputOrder = nub(lines.filter(function(line) {
    return line[0] && nonHeaderLines.indexOf(line[0]) < 0;
  }).map(pluck(0)));

  var findLine = ops.findLine = function(type, index) {
    var lineData = parsed.filter(function(line) {
      return line[0] === type;
    })[index || 0];

    return lineData && lineData[1];
  };

  // push into parsed sections
  lines.forEach(function(line) {
    var customParser = parsers[line[0]];

    if (customParser) {
      activeCollector = customParser(parsed, line);
    }
    else if (activeCollector) {
      activeCollector = activeCollector(line);
    }
    else {
      parsed.push(line);
    }
  });

  /**
    ### addIceCandidate(data)

    Modify the sdp to include candidates as denoted by the data
  **/
  ops.addIceCandidate = function(data) {
    var lineIndex = (data || {}).lineIndex || (data || {}).sdpMLineIndex;
    var mLine = typeof lineIndex != 'undefined' && findLine('m', lineIndex);
    var candidate = (data || {}).candidate;

    // if we have the mLine add the new candidate
    if (mLine && candidate) {
      mLine.childlines.push(candidate.replace(reTrailingNewlines, '').split('='));
    }
  };

  /**
    ### toString() => sdp string
  **/
  ops.toString = function() {
    return parsed.map(function(line) {
      return typeof line[1].toArray == 'function' ? line[1].toArray() : [ line ];
    }).reduce(flatten).map(function(line) {
      return line.join('=');
    }).join('\n');
  };

  return ops;
};
