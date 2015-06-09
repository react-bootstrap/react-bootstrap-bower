define(['exports', 'module', 'react'], function (exports, module, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  /**
   * Note: This is intended as a stop-gap for accessibility concerns that the
   * Bootstrap CSS does not address as they have styled anchors and not buttons
   * in many cases.
   */

  var SafeAnchor = (function (_React$Component) {
    function SafeAnchor(props) {
      _classCallCheck(this, SafeAnchor);

      _get(Object.getPrototypeOf(SafeAnchor.prototype), 'constructor', this).call(this, props);

      this.handleClick = this.handleClick.bind(this);
    }

    _inherits(SafeAnchor, _React$Component);

    _createClass(SafeAnchor, [{
      key: 'handleClick',
      value: function handleClick(event) {
        if (this.props.href === undefined) {
          event.preventDefault();
        }

        if (this.props.onClick) {
          this.props.onClick(event);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _React['default'].createElement('a', _extends({ role: this.props.href ? undefined : 'button'
        }, this.props, {
          onClick: this.handleClick,
          href: this.props.href || '' }));
      }
    }]);

    return SafeAnchor;
  })(_React['default'].Component);

  module.exports = SafeAnchor;

  SafeAnchor.propTypes = {
    href: _React['default'].PropTypes.string,
    onClick: _React['default'].PropTypes.func
  };
});