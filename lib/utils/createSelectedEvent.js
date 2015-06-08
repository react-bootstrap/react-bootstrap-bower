define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = createSelectedEvent;

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