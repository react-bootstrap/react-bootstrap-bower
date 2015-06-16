define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './FadeMixin', './utils/domUtils', './utils/EventListener'], function (exports, module, _react, _classnames, _BootstrapMixin, _FadeMixin, _utilsDomUtils, _utilsEventListener) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _FadeMixin2 = _interopRequireDefault(_FadeMixin);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _EventListener = _interopRequireDefault(_utilsEventListener);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  // TODO:
  // - aria-labelledby
  // - Add `modal-body` div if only one child passed in that doesn't already have it
  // - Tests

  /**
   * Gets the correct clientHeight of the modal container
   * when the body/window/document you need to use the docElement clientHeight
   * @param  {HTMLElement} container
   * @param  {ReactElement|HTMLElement} context
   * @return {Number}
   */
  function containerClientHeight(container, context) {
    var doc = _domUtils['default'].ownerDocument(context);

    return container === doc.body || container === doc.documentElement ? doc.documentElement.clientHeight : container.clientHeight;
  }

  function getContainer(context) {
    return context.props.container && _React['default'].findDOMNode(context.props.container) || _domUtils['default'].ownerDocument(context).body;
  }

  /**
   * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
   * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
   * @param  {ReactElement|HTMLElement} context
   * @param  {Function} handler
   */
  function onFocus(context, handler) {
    var doc = _domUtils['default'].ownerDocument(context);
    var useFocusin = !doc.addEventListener;
    var remove = undefined;

    if (useFocusin) {
      document.attachEvent('onfocusin', handler);
      remove = function () {
        return document.detachEvent('onfocusin', handler);
      };
    } else {
      document.addEventListener('focus', handler, true);
      remove = function () {
        return document.removeEventListener('focus', handler, true);
      };
    }
    return { remove: remove };
  }

  var scrollbarSize = undefined;

  if (_domUtils['default'].canUseDom) {
    var scrollDiv = document.createElement('div');

    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';

    document.body.appendChild(scrollDiv);

    scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    document.body.removeChild(scrollDiv);
    scrollDiv = null;
  }

  var Modal = _React['default'].createClass({
    displayName: 'Modal',

    mixins: [_BootstrapMixin2['default'], _FadeMixin2['default']],

    propTypes: {
      title: _React['default'].PropTypes.node,
      backdrop: _React['default'].PropTypes.oneOf(['static', true, false]),
      keyboard: _React['default'].PropTypes.bool,
      closeButton: _React['default'].PropTypes.bool,
      animation: _React['default'].PropTypes.bool,
      onRequestHide: _React['default'].PropTypes.func.isRequired,
      dialogClassName: _React['default'].PropTypes.string,
      enforceFocus: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'modal',
        backdrop: true,
        keyboard: true,
        animation: true,
        closeButton: true,
        enforceFocus: true
      };
    },

    getInitialState: function getInitialState() {
      return {};
    },

    render: function render() {
      var state = this.state;
      var modalStyle = _extends({}, state.dialogStyles, { display: 'block' });
      var dialogClasses = this.getBsClassSet();

      delete dialogClasses.modal;
      dialogClasses['modal-dialog'] = true;

      var classes = {
        modal: true,
        fade: this.props.animation,
        'in': !this.props.animation
      };

      var modal = _React['default'].createElement(
        'div',
        _extends({}, this.props, {
          title: null,
          tabIndex: '-1',
          role: 'dialog',
          style: modalStyle,
          className: (0, _classNames['default'])(this.props.className, classes),
          onClick: this.props.backdrop === true ? this.handleBackdropClick : null,
          ref: 'modal' }),
        _React['default'].createElement(
          'div',
          { className: (0, _classNames['default'])(this.props.dialogClassName, dialogClasses) },
          _React['default'].createElement(
            'div',
            { className: 'modal-content' },
            this.props.title ? this.renderHeader() : null,
            this.props.children
          )
        )
      );

      return this.props.backdrop ? this.renderBackdrop(modal, state.backdropStyles) : modal;
    },

    renderBackdrop: function renderBackdrop(modal) {
      var classes = {
        'modal-backdrop': true,
        fade: this.props.animation,
        'in': !this.props.animation
      };

      var onClick = this.props.backdrop === true ? this.handleBackdropClick : null;

      return _React['default'].createElement(
        'div',
        null,
        _React['default'].createElement('div', { className: (0, _classNames['default'])(classes), ref: 'backdrop', onClick: onClick }),
        modal
      );
    },

    renderHeader: function renderHeader() {
      var closeButton = undefined;
      if (this.props.closeButton) {
        closeButton = _React['default'].createElement(
          'button',
          { type: 'button', className: 'close', 'aria-hidden': 'true', onClick: this.props.onRequestHide },
          '×'
        );
      }

      return _React['default'].createElement(
        'div',
        { className: 'modal-header' },
        closeButton,
        this.renderTitle()
      );
    },

    renderTitle: function renderTitle() {
      return _React['default'].isValidElement(this.props.title) ? this.props.title : _React['default'].createElement(
        'h4',
        { className: 'modal-title' },
        this.props.title
      );
    },

    iosClickHack: function iosClickHack() {
      // IOS only allows click events to be delegated to the document on elements
      // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
      // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
      _React['default'].findDOMNode(this.refs.modal).onclick = function () {};
      _React['default'].findDOMNode(this.refs.backdrop).onclick = function () {};
    },

    componentDidMount: function componentDidMount() {
      var _this = this;

      var doc = _domUtils['default'].ownerDocument(this);
      var win = _domUtils['default'].ownerWindow(this);

      this._onDocumentKeyupListener = _EventListener['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);

      this._onWindowResizeListener = _EventListener['default'].listen(win, 'resize', this.handleWindowResize);

      if (this.props.enforceFocus) {
        this._onFocusinListener = onFocus(this, this.enforceFocus);
      }

      var container = getContainer(this);

      container.className += container.className.length ? ' modal-open' : 'modal-open';

      this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);

      this._originalPadding = container.style.paddingRight;

      if (this._containerIsOverflowing) {
        container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + scrollbarSize + 'px';
      }

      if (this.props.backdrop) {
        this.iosClickHack();
      }

      this.setState(this._getStyles(), //eslint-disable-line react/no-did-mount-set-state
      function () {
        return _this.focusModalContent();
      });
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
      if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) {
        this.iosClickHack();
        this.setState(this._getStyles()); //eslint-disable-line react/no-did-update-set-state
      }

      if (this.props.container !== prevProps.container) {
        var container = getContainer(this);
        this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);
      }
    },

    componentWillUnmount: function componentWillUnmount() {
      this._onDocumentKeyupListener.remove();
      this._onWindowResizeListener.remove();

      if (this._onFocusinListener) {
        this._onFocusinListener.remove();
      }

      var container = getContainer(this);

      container.style.paddingRight = this._originalPadding;

      container.className = container.className.replace(/ ?modal-open/, '');

      this.restoreLastFocus();
    },

    handleBackdropClick: function handleBackdropClick(e) {
      if (e.target !== e.currentTarget) {
        return;
      }

      this.props.onRequestHide();
    },

    handleDocumentKeyUp: function handleDocumentKeyUp(e) {
      if (this.props.keyboard && e.keyCode === 27) {
        this.props.onRequestHide();
      }
    },

    handleWindowResize: function handleWindowResize() {
      this.setState(this._getStyles());
    },

    focusModalContent: function focusModalContent() {
      if (this.props.enforceFocus) {
        this.lastFocus = _domUtils['default'].activeElement(this);

        var modalContent = _React['default'].findDOMNode(this.refs.modal);
        modalContent.focus();
      }
    },

    restoreLastFocus: function restoreLastFocus() {
      if (this.lastFocus) {
        this.lastFocus.focus();
        this.lastFocus = null;
      }
    },

    enforceFocus: function enforceFocus() {
      if (!this.isMounted()) {
        return;
      }

      var active = _domUtils['default'].activeElement(this);
      var modal = _React['default'].findDOMNode(this.refs.modal);

      if (modal !== active && !_domUtils['default'].contains(modal, active)) {
        modal.focus();
      }
    },

    _getStyles: function _getStyles() {
      if (!_domUtils['default'].canUseDom) {
        return {};
      }

      var node = _React['default'].findDOMNode(this.refs.modal);
      var scrollHt = node.scrollHeight;
      var container = getContainer(this);
      var containerIsOverflowing = this._containerIsOverflowing;
      var modalIsOverflowing = scrollHt > containerClientHeight(container, this);

      return {
        dialogStyles: {
          paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize : void 0,
          paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize : void 0
        }
      };
    }
  });

  module.exports = Modal;
});