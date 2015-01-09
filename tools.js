var reLineBreak = /\r?\n/;

exports.split = function(sdp) {
  return sdp.split(reLineBreak).filter(Boolean);
};

exports.join = function(lines) {
  return lines.join('\n') + '\n';
};
