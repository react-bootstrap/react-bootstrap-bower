define(['exports', 'module', 'react', './Portal', './Position', './RootCloseWrapper'], function (exports, module, _react, _Portal, _Position, _RootCloseWrapper) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  /*eslint-disable object-shorthand, react/prop-types */

  var _React = _interopRequireDefault(_react);

  var _Portal2 = _interopRequireDefault(_Portal);

  var _Position2 = _interopRequireDefault(_Position);

  var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');
  var Overlay = (function (_React$Component) {
    function Overlay(props, context) {
      _classCallCheck(this, Overlay);

      _get(Object.getPrototypeOf(Overlay.prototype), 'constructor', this).call(this, props, context);
    }

    _inherits(Overlay, _React$Component);

    _createClass(Overlay, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var container = _props.container;
        var containerPadding = _props.containerPadding;
        var target = _props.target;
        var placement = _props.placement;
        var rootClose = _props.rootClose;

        var props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'rootClose']);

        var positionedChild = _React['default'].createElement(
          _Position2['default'],
          { container: container, containerPadding: containerPadding, target: target, placement: placement },
          this.props.children
        );

        if (rootClose) {
          positionedChild = _React['default'].createElement(
            _RootCloseWrapper2['default'],
            { onRootClose: this.props.onHide },
            positionedChild
          );
        }

        return _React['default'].createElement(
          _Portal2['default'],
          { container: container, rootClose: rootClose, onRootClose: this.props.onHide },
          props.show && positionedChild
        );
      }
    }]);

    return Overlay;
  })(_React['default'].Component);

  Overlay.propTypes = _extends({}, _Portal2['default'].propTypes, _Position2['default'].propTypes, {
    /**
     * Set the visibility of the Overlay
     */
    show: _React['default'].PropTypes.bool,
    /**
     * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
     */
    rootClose: _React['default'].PropTypes.bool,
    /**
     * A Callback fired by the Overlay when it wishes to be hidden.
     */
    onHide: _React['default'].PropTypes.func
  });

  module.exports = Overlay;
});