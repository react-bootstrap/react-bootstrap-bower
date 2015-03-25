define(["exports", "module", "react", "./utils/ValidComponentChildren", "classnames"], function (exports, module, _react, _utilsValidComponentChildren, _classnames) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var classSet = _interopRequire(_classnames);

  var Badge = React.createClass({
    displayName: "Badge",

    propTypes: {
      pullRight: React.PropTypes.bool
    },

    hasContent: function hasContent() {
      return ValidComponentChildren.hasValidComponent(this.props.children) || typeof this.props.children === "string" || typeof this.props.children === "number";
    },

    render: function render() {
      var classes = {
        "pull-right": this.props.pullRight,
        badge: this.hasContent()
      };
      return React.createElement(
        "span",
        _extends({}, this.props, {
          className: classSet(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Badge;
});