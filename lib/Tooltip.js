define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './FadeMixin'], function (exports, module, _react, _classnames, _BootstrapMixin, _FadeMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

  var _React = _interopRequire(_react);

  var _classNames = _interopRequire(_classnames);

  var _BootstrapMixin2 = _interopRequire(_BootstrapMixin);

  var _FadeMixin2 = _interopRequire(_FadeMixin);

  var Tooltip = _React.createClass({
    displayName: 'Tooltip',

    mixins: [_BootstrapMixin2, _FadeMixin2],

    propTypes: {
      placement: _React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
      positionLeft: _React.PropTypes.number,
      positionTop: _React.PropTypes.number,
      arrowOffsetLeft: _React.PropTypes.oneOfType([_React.PropTypes.number, _React.PropTypes.string]),
      arrowOffsetTop: _React.PropTypes.oneOfType([_React.PropTypes.number, _React.PropTypes.string]),
      animation: _React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        placement: 'right',
        animation: true
      };
    },

    render: function render() {
      var _classes;

      var classes = (_classes = {
        'tooltip': true }, _defineProperty(_classes, this.props.placement, true), _defineProperty(_classes, 'in', !this.props.animation && (this.props.positionLeft != null || this.props.positionTop != null)), _defineProperty(_classes, 'fade', this.props.animation), _classes);

      var style = {
        'left': this.props.positionLeft,
        'top': this.props.positionTop
      };

      var arrowStyle = {
        'left': this.props.arrowOffsetLeft,
        'top': this.props.arrowOffsetTop
      };

      return _React.createElement(
        'div',
        _extends({}, this.props, { className: (0, _classNames)(this.props.className, classes), style: style }),
        _React.createElement('div', { className: 'tooltip-arrow', style: arrowStyle }),
        _React.createElement(
          'div',
          { className: 'tooltip-inner' },
          this.props.children
        )
      );
    }
  });

  module.exports = Tooltip;
});

// in class will be added by the FadeMixin when the animation property is true