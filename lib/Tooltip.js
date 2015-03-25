define(["exports", "module", "react", "classnames", "./BootstrapMixin"], function (exports, module, _react, _classnames, _BootstrapMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var Tooltip = React.createClass({
    displayName: "Tooltip",

    mixins: [BootstrapMixin],

    propTypes: {
      placement: React.PropTypes.oneOf(["top", "right", "bottom", "left"]),
      positionLeft: React.PropTypes.number,
      positionTop: React.PropTypes.number,
      arrowOffsetLeft: React.PropTypes.number,
      arrowOffsetTop: React.PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        placement: "right"
      };
    },

    render: function render() {
      var _this = this;

      var classes = (function () {
        var _classes = {
          tooltip: true };

        _defineProperty(_classes, _this.props.placement, true);

        _defineProperty(_classes, "in", _this.props.positionLeft != null || _this.props.positionTop != null);

        return _classes;
      })();

      var style = {
        left: this.props.positionLeft,
        top: this.props.positionTop
      };

      var arrowStyle = {
        left: this.props.arrowOffsetLeft,
        top: this.props.arrowOffsetTop
      };

      return React.createElement(
        "div",
        _extends({}, this.props, { className: classSet(this.props.className, classes), style: style }),
        React.createElement("div", { className: "tooltip-arrow", style: arrowStyle }),
        React.createElement(
          "div",
          { className: "tooltip-inner" },
          this.props.children
        )
      );
    }
  });

  module.exports = Tooltip;
});