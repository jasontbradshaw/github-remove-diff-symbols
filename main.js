var hasClass = function (el, className) {
  return (' ' + el.className + ' ').indexOf(' ' + className + ' ') >= 0;
};

var trimDiffLines = function () {
  var trimmedClassName = 'blob-code-diff-trimmed';

  // get all the code blob lines that haven't been trimmed yet
  var lines = document.querySelectorAll([
    '.blob-code-addition:not(.' +  trimmedClassName + ')',
    '.blob-code-context:not(.' + trimmedClassName +  ')',
    '.blob-code-deletion:not(.' + trimmedClassName +  ')',
    '.blob-expanded .blob-code:not(.' + trimmedClassName +  ')',
    '.blob-expanded .blob-code > span:not(.' + trimmedClassName +  ')',
  ].join(', '));

  Array.prototype.forEach.call(lines, function (line) {
    // only check the first two nodes, since those are the only ones that can
    // match the conditions we're looking for.
    var nodes = Array.prototype.slice.call(line.childNodes, 0, 2);

    // trim a matching leading character from text nodes of diff lines. we trim
    // both lines of context _and_ diff lines in order to ensure that the diff
    // lines match up with the context lines.
    Array.prototype.forEach.call(nodes, function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // if the node is a `+`, `-`, or single leading space, trim it
        if (/^[-+\s]/.test(node.textContent)) {
          node.textContent = node.textContent.slice(1);

          if (!hasClass(line, trimmedClassName)) {
            line.className += ' ' + trimmedClassName;
          }
        }
      }
    });
  });
};

// keep trying to trim diff lines, since they like to re-appear often
setInterval(trimDiffLines, 500);

// do an initial trim to catch lines that came to us on page load
trimDiffLines();
