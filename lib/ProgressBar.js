define(["exports", "module", "react", "./Interpolate", "./BootstrapMixin", "classnames", "./utils/ValidComponentChildren"], function (exports, module, _react, _Interpolate, _BootstrapMixin, _classnames, _utilsValidComponentChildren) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var Interpolate = _interopRequire(_Interpolate);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var classSet = _interopRequire(_classnames);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var ProgressBar = React.createClass({
    displayName: "ProgressBar",

    propTypes: {
      min: React.PropTypes.number,
      now: React.PropTypes.number,
      max: React.PropTypes.number,
      label: React.PropTypes.node,
      srOnly: React.PropTypes.bool,
      striped: React.PropTypes.bool,
      active: React.PropTypes.bool
    },

    mixins: [BootstrapMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "progress-bar",
        min: 0,
        max: 100
      };
    },

    getPercentage: function getPercentage(now, min, max) {
      return Math.ceil((now - min) / (max - min) * 100);
    },

    render: function render() {
      var classes = {
        progress: true
      };

      if (this.props.active) {
        classes["progress-striped"] = true;
        classes.active = true;
      } else if (this.props.striped) {
        classes["progress-striped"] = true;
      }

      if (!ValidComponentChildren.hasValidComponent(this.props.children)) {
        if (!this.props.isChild) {
          return React.createElement(
            "div",
            _extends({}, this.props, { className: classSet(this.props.className, classes) }),
            this.renderProgressBar()
          );
        } else {
          return this.renderProgressBar();
        }
      } else {
        return React.createElement(
          "div",
          _extends({}, this.props, { className: classSet(this.props.className, classes) }),
          ValidComponentChildren.map(this.props.children, this.renderChildBar)
        );
      }
    },

    renderChildBar: function renderChildBar(child, index) {
      return cloneElement(child, {
        isChild: true,
        key: child.key ? child.key : index
      });
    },

    renderProgressBar: function renderProgressBar() {
      var percentage = this.getPercentage(this.props.now, this.props.min, this.props.max);

      var label = undefined;

      if (typeof this.props.label === "string") {
        label = this.renderLabel(percentage);
      } else if (this.props.label) {
        label = this.props.label;
      }

      if (this.props.srOnly) {
        label = this.renderScreenReaderOnlyLabel(label);
      }

      var classes = this.getBsClassSet();

      return React.createElement(
        "div",
        _extends({}, this.props, { className: classSet(this.props.className, classes), role: "progressbar",
          style: { width: percentage + "%" },
          "aria-valuenow": this.props.now,
          "aria-valuemin": this.props.min,
          "aria-valuemax": this.props.max }),
        label
      );
    },

    renderLabel: function renderLabel(percentage) {
      var InterpolateClass = this.props.interpolateClass || Interpolate;

      return React.createElement(
        InterpolateClass,
        {
          now: this.props.now,
          min: this.props.min,
          max: this.props.max,
          percent: percentage,
          bsStyle: this.props.bsStyle },
        this.props.label
      );
    },

    renderScreenReaderOnlyLabel: function renderScreenReaderOnlyLabel(label) {
      return React.createElement(
        "span",
        { className: "sr-only" },
        label
      );
    }
  });

  module.exports = ProgressBar;
});