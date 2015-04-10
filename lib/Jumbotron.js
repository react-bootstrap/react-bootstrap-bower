define(["exports", "module", "react", "classnames"], function (exports, module, _react, _classnames) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classNames = _interopRequire(_classnames);

  var Jumbotron = React.createClass({
    displayName: "Jumbotron",

    render: function render() {
      return React.createElement(
        "div",
        _extends({}, this.props, { className: classNames(this.props.className, "jumbotron") }),
        this.props.children
      );
    }
  });

  module.exports = Jumbotron;
});