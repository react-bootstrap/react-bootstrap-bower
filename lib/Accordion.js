define(["exports", "module", "react", "./PanelGroup"], function (exports, module, _react, _PanelGroup) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var PanelGroup = _interopRequire(_PanelGroup);

  var Accordion = React.createClass({
    displayName: "Accordion",

    render: function render() {
      return React.createElement(
        PanelGroup,
        _extends({}, this.props, { accordion: true }),
        this.props.children
      );
    }
  });

  module.exports = Accordion;
});