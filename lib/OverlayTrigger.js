define(['exports', 'module', 'react', './utils/createChainedFunction', './utils/createContextWrapper', './Overlay', './utils/overlayPositionUtils', './utils/deprecationWarning', 'react/lib/warning'], function (exports, module, _react, _utilsCreateChainedFunction, _utilsCreateContextWrapper, _Overlay, _utilsOverlayPositionUtils, _utilsDeprecationWarning, _reactLibWarning) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /*eslint-disable react/prop-types */

  var _React = _interopRequireDefault(_react);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _createContextWrapper = _interopRequireDefault(_utilsCreateContextWrapper);

  var _Overlay2 = _interopRequireDefault(_Overlay);

  var _position = _interopRequireDefault(_utilsOverlayPositionUtils);

  var _deprecationWarning = _interopRequireDefault(_utilsDeprecationWarning);

  var _warning = _interopRequireDefault(_reactLibWarning);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  /**
   * Check if value one is inside or equal to the of value
   *
   * @param {string} one
   * @param {string|array} of
   * @returns {boolean}
   */
  function isOneOf(one, of) {
    if (Array.isArray(of)) {
      return of.indexOf(one) >= 0;
    }
    return one === of;
  }

  var OverlayTrigger = _React['default'].createClass({
    displayName: 'OverlayTrigger',

    propTypes: _extends({}, _Overlay2['default'].propTypes, {

      /**
      * Specify which action or actions trigger Overlay visibility
      */
      trigger: _React['default'].PropTypes.oneOfType([_React['default'].PropTypes.oneOf(['manual', 'click', 'hover', 'focus']), _React['default'].PropTypes.arrayOf(_React['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),

      /**
       * A millisecond delay amount to show and hide the Overlay once triggered
       */
      delay: _React['default'].PropTypes.number,
      /**
       * A millisecond delay amount before showing the Overlay once triggered.
       */
      delayShow: _React['default'].PropTypes.number,
      /**
       * A millisecond delay amount before hiding the Overlay once triggered.
       */
      delayHide: _React['default'].PropTypes.number,

      /**
       * The initial visibility state of the Overlay, for more nuanced visibility controll consider
       * using the Overlay component directly.
       */
      defaultOverlayShown: _React['default'].PropTypes.bool,

      /**
       * An element or text to overlay next to the target.
       */
      overlay: _React['default'].PropTypes.node.isRequired,

      /**
       * @private
       */
      onBlur: _React['default'].PropTypes.func,
      /**
       * @private
       */
      onClick: _React['default'].PropTypes.func,
      /**
       * @private
       */
      onFocus: _React['default'].PropTypes.func,
      /**
       * @private
       */
      onMouseEnter: _React['default'].PropTypes.func,
      /**
       * @private
       */
      onMouseLeave: _React['default'].PropTypes.func,

      //override specific overlay props
      /**
       * @private
       */
      target: function target() {},
      /**
      * @private
      */
      onHide: function onHide() {},
      /**
       * @private
       */
      show: function show() {}
    }),

    getDefaultProps: function getDefaultProps() {
      return {
        trigger: ['hover', 'focus']
      };
    },

    getInitialState: function getInitialState() {
      return {
        isOverlayShown: this.props.defaultOverlayShown == null ? false : this.props.defaultOverlayShown
      };
    },

    show: function show() {
      this.setState({
        isOverlayShown: true
      });
    },

    hide: function hide() {
      this.setState({
        isOverlayShown: false
      });
    },

    toggle: function toggle() {
      if (this.state.isOverlayShown) {
        this.hide();
      } else {
        this.show();
      }
    },

    componentDidMount: function componentDidMount() {
      this._mountNode = document.createElement('div');
      _React['default'].render(this._overlay, this._mountNode);
    },

    componentWillUnmount: function componentWillUnmount() {
      _React['default'].unmountComponentAtNode(this._mountNode);
      this._mountNode = null;
      clearTimeout(this._hoverDelay);
    },

    componentDidUpdate: function componentDidUpdate() {
      _React['default'].render(this._overlay, this._mountNode);
    },

    getOverlay: function getOverlay() {
      var _this = this;

      var props = {
        show: this.state.isOverlayShown,
        onHide: this.hide,
        rootClose: this.props.rootClose,
        target: function target() {
          return _React['default'].findDOMNode(_this);
        },
        placement: this.props.placement,
        container: this.props.container,
        containerPadding: this.props.containerPadding
      };

      var overlay = (0, _react.cloneElement)(this.props.overlay, {
        placement: props.placement,
        container: props.container
      });

      return _React['default'].createElement(
        _Overlay2['default'],
        props,
        overlay
      );
    },

    render: function render() {
      var trigger = _React['default'].Children.only(this.props.children);

      var props = {
        'aria-describedby': this.props.overlay.props.id
      };

      // create in render otherwise owner is lost...
      this._overlay = this.getOverlay();

      if (this.props.trigger !== 'manual') {

        props.onClick = (0, _createChainedFunction['default'])(trigger.props.onClick, this.props.onClick);

        if (isOneOf('click', this.props.trigger)) {
          props.onClick = (0, _createChainedFunction['default'])(this.toggle, props.onClick);
        }

        if (isOneOf('hover', this.props.trigger)) {
          (0, _warning['default'])(!(this.props.trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');

          props.onMouseOver = (0, _createChainedFunction['default'])(this.handleDelayedShow, this.props.onMouseOver);
          props.onMouseOut = (0, _createChainedFunction['default'])(this.handleDelayedHide, this.props.onMouseOut);
        }

        if (isOneOf('focus', this.props.trigger)) {
          props.onFocus = (0, _createChainedFunction['default'])(this.handleDelayedShow, this.props.onFocus);
          props.onBlur = (0, _createChainedFunction['default'])(this.handleDelayedHide, this.props.onBlur);
        }
      } else {
        (0, _deprecationWarning['default'])('"manual" trigger type', ' the Overlay component');
      }

      return (0, _react.cloneElement)(trigger, props);
    },

    handleDelayedShow: function handleDelayedShow() {
      var _this2 = this;

      if (this._hoverDelay != null) {
        clearTimeout(this._hoverDelay);
        this._hoverDelay = null;
        return;
      }

      var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

      if (!delay) {
        this.show();
        return;
      }

      this._hoverDelay = setTimeout(function () {
        _this2._hoverDelay = null;
        _this2.show();
      }, delay);
    },

    handleDelayedHide: function handleDelayedHide() {
      var _this3 = this;

      if (this._hoverDelay != null) {
        clearTimeout(this._hoverDelay);
        this._hoverDelay = null;
        return;
      }

      var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

      if (!delay) {
        this.hide();
        return;
      }

      this._hoverDelay = setTimeout(function () {
        _this3._hoverDelay = null;
        _this3.hide();
      }, delay);
    },

    // deprecated Methods
    calcOverlayPosition: function calcOverlayPosition() {
      var overlay = this.props.overlay;

      (0, _deprecationWarning['default'])('OverlayTrigger.calcOverlayPosition()', 'utils/overlayPositionUtils');

      return _position['default'].calcOverlayPosition(overlay.props.placement || this.props.placement, _React['default'].findDOMNode(overlay), _React['default'].findDOMNode(this), _React['default'].findDOMNode(overlay.props.container || this.props.container), overlay.props.containerPadding || this.props.containerPadding);
    },

    getPosition: function getPosition() {
      (0, _deprecationWarning['default'])('OverlayTrigger.getPosition()', 'utils/overlayPositionUtils');

      var overlay = this.props.overlay;

      return _position['default'].getPosition(_React['default'].findDOMNode(this), _React['default'].findDOMNode(overlay.props.container || this.props.container));
    }

  });

  /**
   * Creates a new OverlayTrigger class that forwards the relevant context
   *
   * This static method should only be called at the module level, instead of in
   * e.g. a render() method, because it's expensive to create new classes.
   *
   * For example, you would want to have:
   *
   * > export default OverlayTrigger.withContext({
   * >   myContextKey: React.PropTypes.object
   * > });
   *
   * and import this when needed.
   */
  OverlayTrigger.withContext = (0, _createContextWrapper['default'])(OverlayTrigger, 'overlay');

  module.exports = OverlayTrigger;
});