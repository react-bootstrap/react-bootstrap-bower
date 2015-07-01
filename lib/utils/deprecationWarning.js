define(['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = deprecationWarning;
  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  function deprecationWarning(oldname, newname, link) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof console === 'undefined' || typeof console.warn !== 'function') {
        return;
      }

      var message = '' + oldname + ' is deprecated. Use ' + newname + ' instead.';
      console.warn(message);

      if (link) {
        console.warn('You can read more about it at ' + link);
      }
    }
  }
});