define(['exports', 'module', 'react', './utils/CustomPropTypes', './utils/deprecationWarning', './utils/createChainedFunction', './utils/createContextWrapper'], function (exports, module, _react, _utilsCustomPropTypes, _utilsDeprecationWarning, _utilsCreateChainedFunction, _utilsCreateContextWrapper) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _CustomPropTypes = _interopRequireDefault(_utilsCustomPropTypes);

  var _deprecationWarning = _interopRequireDefault(_utilsDeprecationWarning);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _createContextWrapper = _interopRequireDefault(_utilsCreateContextWrapper);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  function createHideDepreciationWrapper(hide) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (0, _deprecationWarning['default'])('The Modal prop `onRequestHide`', 'the `onHide` prop');

      return hide.apply(undefined, args);
    };
  }

  var ModalTrigger = _React['default'].createClass({
    displayName: 'ModalTrigger',

    propTypes: {
      modal: _React['default'].PropTypes.node.isRequired,
      /**
       * The DOM Node that the Component will render it's children into
       */
      container: _CustomPropTypes['default'].mountable,
      onBlur: _React['default'].PropTypes.func,
      onFocus: _React['default'].PropTypes.func,
      onMouseOut: _React['default'].PropTypes.func,
      onMouseOver: _React['default'].PropTypes.func
    },

    getInitialState: function getInitialState() {
      return {
        isOverlayShown: false
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
      this.setState({
        isOverlayShown: !this.state.isOverlayShown
      });
    },

    componentDidMount: function componentDidMount() {
      this._overlay = document.createElement('div');
      _React['default'].render(this.getOverlay(), this._overlay);
    },

    componentWillUnmount: function componentWillUnmount() {
      _React['default'].unmountComponentAtNode(this._overlay);
      this._overlay = null;
      clearTimeout(this._hoverDelay);
    },

    componentDidUpdate: function componentDidUpdate() {
      _React['default'].render(this.getOverlay(), this._overlay);
    },

    getOverlay: function getOverlay() {
      var modal = this.props.modal;

      return (0, _react.cloneElement)(modal, {
        show: this.state.isOverlayShown,
        onHide: this.hide,
        onRequestHide: createHideDepreciationWrapper(this.hide),
        container: modal.props.container || this.props.container
      });
    },

    render: function render() {
      var child = _React['default'].Children.only(this.props.children);
      var props = {};

      props.onClick = (0, _createChainedFunction['default'])(child.props.onClick, this.toggle);
      props.onMouseOver = (0, _createChainedFunction['default'])(child.props.onMouseOver, this.props.onMouseOver);
      props.onMouseOut = (0, _createChainedFunction['default'])(child.props.onMouseOut, this.props.onMouseOut);
      props.onFocus = (0, _createChainedFunction['default'])(child.props.onFocus, this.props.onFocus);
      props.onBlur = (0, _createChainedFunction['default'])(child.props.onBlur, this.props.onBlur);

      return (0, _react.cloneElement)(child, props);
    }
  });

  /**
   * Creates a new ModalTrigger class that forwards the relevant context
   *
   * This static method should only be called at the module level, instead of in
   * e.g. a render() method, because it's expensive to create new classes.
   *
   * For example, you would want to have:
   *
   * > export default ModalTrigger.withContext({
   * >   myContextKey: React.PropTypes.object
   * > });
   *
   * and import this when needed.
   */
  ModalTrigger.withContext = (0, _createContextWrapper['default'])(ModalTrigger, 'modal');

  var DepreciatedModalTrigger = _React['default'].createClass({
    displayName: 'DepreciatedModalTrigger',

    componentWillMount: function componentWillMount() {
      (0, _deprecationWarning['default'])('The `ModalTrigger` component', 'the `Modal` component directly', 'http://react-bootstrap.github.io/components.html#modals');
    },

    render: function render() {
      return _React['default'].createElement(ModalTrigger, this.props);
    }
  });

  DepreciatedModalTrigger.withContext = ModalTrigger.withContext;
  DepreciatedModalTrigger.ModalTrigger = ModalTrigger;

  module.exports = DepreciatedModalTrigger;
});