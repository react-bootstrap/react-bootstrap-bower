define(["exports", "module", "react", "classnames", "./BootstrapMixin"], function (exports, module, _react, _classnames, _BootstrapMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classNames = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var Popover = React.createClass({
    displayName: "Popover",

    mixins: [BootstrapMixin],

    propTypes: {
      placement: React.PropTypes.oneOf(["top", "right", "bottom", "left"]),
      positionLeft: React.PropTypes.number,
      positionTop: React.PropTypes.number,
      arrowOffsetLeft: React.PropTypes.number,
      arrowOffsetTop: React.PropTypes.number,
      title: React.PropTypes.node
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
          popover: true };

        _defineProperty(_classes, _this.props.placement, true);

        _defineProperty(_classes, "in", _this.props.positionLeft != null || _this.props.positionTop != null);

        return _classes;
      })();

      var style = {
        left: this.props.positionLeft,
        top: this.props.positionTop,
        display: "block"
      };

      var arrowStyle = {
        left: this.props.arrowOffsetLeft,
        top: this.props.arrowOffsetTop
      };

      return React.createElement(
        "div",
        _extends({}, this.props, { className: classNames(this.props.className, classes), style: style, title: null }),
        React.createElement("div", { className: "arrow", style: arrowStyle }),
        this.props.title ? this.renderTitle() : null,
        React.createElement(
          "div",
          { className: "popover-content" },
          this.props.children
        )
      );
    },

    renderTitle: function renderTitle() {
      return React.createElement(
        "h3",
        { className: "popover-title" },
        this.props.title
      );
    }
  });

  module.exports = Popover;
});