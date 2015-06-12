define(['exports', 'module'], function (exports, module) {
  'use strict';

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');
  /**
   * Safe chained function
   *
   * Will only create a new function if needed,
   * otherwise will pass back existing functions or null.
   *
   * @param {function} one
   * @param {function} two
   * @returns {function|null}
   */
  function createChainedFunction(one, two) {
    var hasOne = typeof one === 'function';
    var hasTwo = typeof two === 'function';

    if (!hasOne && !hasTwo) {
      return null;
    }
    if (!hasOne) {
      return two;
    }
    if (!hasTwo) {
      return one;
    }

    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  module.exports = createChainedFunction;
});