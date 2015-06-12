define(['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = createSelectedEvent;
  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  function createSelectedEvent(eventKey) {
    var selectionPrevented = false;

    return {
      eventKey: eventKey,

      preventSelection: function preventSelection() {
        selectionPrevented = true;
      },

      isSelectionPrevented: function isSelectionPrevented() {
        return selectionPrevented;
      }
    };
  }
});