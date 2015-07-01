define(['exports', 'module', 'react', './utils/domUtils', './utils/overlayPositionUtils', './utils/CustomPropTypes'], function (exports, module, _react, _utilsDomUtils, _utilsOverlayPositionUtils, _utilsCustomPropTypes) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _CustomPropTypes = _interopRequireDefault(_utilsCustomPropTypes);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var Position = (function (_React$Component) {
    function Position(props, context) {
      _classCallCheck(this, Position);

      _get(Object.getPrototypeOf(Position.prototype), 'constructor', this).call(this, props, context);
      this.state = {
        positionLeft: null,
        positionTop: null,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      };
    }

    _inherits(Position, _React$Component);

    _createClass(Position, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this._needsFlush = true;
      }
    }, {
      key: 'componentWillRecieveProps',
      value: function componentWillRecieveProps() {
        this._needsFlush = true;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._maybeUpdatePosition();
      }
    }, {
      key: 'componentDidUpate',
      value: function componentDidUpate() {
        this._maybeUpdatePosition();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var placement = _props.placement;
        var children = _props.children;

        var _ref = this.props.target ? this.state : {};

        var positionLeft = _ref.positionLeft;
        var positionTop = _ref.positionTop;

        var arrows = _objectWithoutProperties(_ref, ['positionLeft', 'positionTop']);

        return (0, _react.cloneElement)(_React['default'].Children.only(children), _extends({}, arrows, {
          placement: placement,
          positionTop: positionTop,
          positionLeft: positionLeft,
          style: _extends({}, children.props.style, {
            left: positionLeft,
            top: positionTop
          })
        }));
      }
    }, {
      key: '_maybeUpdatePosition',
      value: function _maybeUpdatePosition() {
        if (this._needsFlush) {
          this._needsFlush = false;
          this._updatePosition();
        }
      }
    }, {
      key: '_updatePosition',
      value: function _updatePosition() {
        if (this.props.target == null) {
          return;
        }

        var target = _React['default'].findDOMNode(this.props.target(this.props));
        var container = _React['default'].findDOMNode(this.props.container) || _domUtils['default'].ownerDocument(this).body;

        this.setState((0, _utilsOverlayPositionUtils.calcOverlayPosition)(this.props.placement, _React['default'].findDOMNode(this), target, container, this.props.containerPadding));
      }
    }]);

    return Position;
  })(_React['default'].Component);

  Position.propTypes = {
    /**
     * The target DOM node the Component is positioned next too.
     */
    target: _React['default'].PropTypes.func,
    /**
     * The "offsetParent" of the Component
     */
    container: _CustomPropTypes['default'].mountable,
    /**
     * Distance in pixels the Component should be positioned to the edge of the Container.
     */
    containerPadding: _React['default'].PropTypes.number,
    /**
     * The location that the overlay should be positioned to its target.
     */
    placement: _React['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
  };

  Position.defaultProps = {
    containerPadding: 0,
    placement: 'right'
  };

  module.exports = Position;
});