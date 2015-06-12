define(['exports', 'module', 'react', './Interpolate', './BootstrapMixin', 'classnames', './utils/ValidComponentChildren'], function (exports, module, _react, _Interpolate, _BootstrapMixin, _classnames, _utilsValidComponentChildren) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /* eslint react/prop-types: [1, {ignore: ["className", "bsStyle"]}]*/
  /* BootstrapMixin contains `bsStyle` type validation */

  var _React = _interopRequireDefault(_react);

  var _Interpolate2 = _interopRequireDefault(_Interpolate);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _classNames = _interopRequireDefault(_classnames);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var ProgressBar = _React['default'].createClass({
    displayName: 'ProgressBar',

    propTypes: {
      min: _react.PropTypes.number,
      now: _react.PropTypes.number,
      max: _react.PropTypes.number,
      label: _react.PropTypes.node,
      srOnly: _react.PropTypes.bool,
      striped: _react.PropTypes.bool,
      active: _react.PropTypes.bool,
      children: onlyProgressBar,
      interpolateClass: _react.PropTypes.node,
      isChild: _react.PropTypes.bool
    },

    mixins: [_BootstrapMixin2['default']],

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'progress-bar',
        min: 0,
        max: 100
      };
    },

    getPercentage: function getPercentage(now, min, max) {
      var roundPrecision = 1000;
      return Math.round((now - min) / (max - min) * 100 * roundPrecision) / roundPrecision;
    },

    render: function render() {
      if (this.props.isChild) {
        return this.renderProgressBar();
      }

      var classes = {
        active: this.props.active,
        progress: true,
        'progress-striped': this.props.active || this.props.striped
      };

      var content = undefined;

      if (this.props.children) {
        content = _ValidComponentChildren['default'].map(this.props.children, this.renderChildBar);
      } else {
        content = this.renderProgressBar();
      }

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, { className: (0, _classNames['default'])(this.props.className, classes) }),
        content
      );
    },

    renderChildBar: function renderChildBar(child, index) {
      return (0, _react.cloneElement)(child, {
        isChild: true,
        key: child.key ? child.key : index
      });
    },

    renderProgressBar: function renderProgressBar() {
      var percentage = this.getPercentage(this.props.now, this.props.min, this.props.max);

      var label = undefined;

      if (typeof this.props.label === 'string') {
        label = this.renderLabel(percentage);
      } else {
        label = this.props.label;
      }

      if (this.props.srOnly) {
        label = _React['default'].createElement(
          'span',
          { className: 'sr-only' },
          label
        );
      }

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, this.getBsClassSet()),
          role: 'progressbar',
          style: { width: percentage + '%' },
          'aria-valuenow': this.props.now,
          'aria-valuemin': this.props.min,
          'aria-valuemax': this.props.max }),
        label
      );
    },

    renderLabel: function renderLabel(percentage) {
      var InterpolateClass = this.props.interpolateClass || _Interpolate2['default'];

      return _React['default'].createElement(
        InterpolateClass,
        {
          now: this.props.now,
          min: this.props.min,
          max: this.props.max,
          percent: percentage,
          bsStyle: this.props.bsStyle },
        this.props.label
      );
    }
  });

  /**
   * Custom propTypes checker
   */
  function onlyProgressBar(props, propName, componentName) {
    if (props[propName]) {
      var _ret = (function () {
        var error = undefined,
            childIdentifier = undefined;

        _React['default'].Children.forEach(props[propName], function (child) {
          if (child.type !== ProgressBar) {
            childIdentifier = child.type.displayName ? child.type.displayName : child.type;
            error = new Error('Children of ' + componentName + ' can contain only ProgressBar components. Found ' + childIdentifier);
          }
        });

        return {
          v: error
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }
  }

  module.exports = ProgressBar;
});