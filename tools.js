var reLineBreak = /\r?\n/;

exports.join = function(lines) {
  return lines.join('\n') + '\n';
};

// the locate function parses the lines and returns an array of line indexes of matches
// the matches are returned in reverse order so that new lines can be spliced in without
// invalidating the previously found locations
exports.locate = function(regex, lines) {

  function isMatch(line, idx) {
    return regex.test(line) && idx;
  }

  return (lines || []).map(isMatch).filter(function(val) {
    return typeof val == 'number';
  }).reverse();
};

exports.split = function(sdp) {
  return sdp.split(reLineBreak).filter(Boolean);
};

