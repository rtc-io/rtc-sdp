/* jshint node: true */
'use strict';

var nub = require('whisk/nub');
var pluck = require('whisk/pluck');
var flatten = require('whisk/flatten');
var reLineBreak = /\n\r?/;

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
  var lines = sdp.split(reLineBreak).map(function(line) {
    return line.split('=');
  });

  var inputOrder = nub(lines.filter(function(line) {
    return line[0] && nonHeaderLines.indexOf(line[0]) < 0;
  }).map(pluck(0)));

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

  // console.log(require('util').inspect(parsed, { colors: true, depth: null }));


  /**
    ### addCandidate(data)

    Modify the sdp to include candidates as denoted by the data
  **/
  ops.addCandidate = function(data) {
  };

  /**
    ### toString() => sdp string
  **/
  ops.toString = function() {
    return parsed.map(function(line) {
      return Array.isArray(line) ? [ line ] : line.toArray()
    }).reduce(flatten).map(function(line) {
      return line.join('=');
    }).join('\n');
  };

  return ops;
};