define(['exports', 'module', 'react', 'classnames', './utils/createChainedFunction', './BootstrapMixin', './FadeMixin', './utils/domUtils', './utils/EventListener', './utils/deprecationWarning', './Portal', './ModalBody', './ModalHeader', './ModalTitle', './ModalFooter'], function (exports, module, _react, _classnames, _utilsCreateChainedFunction, _BootstrapMixin, _FadeMixin, _utilsDomUtils, _utilsEventListener, _utilsDeprecationWarning, _Portal, _ModalBody, _ModalHeader, _ModalTitle, _ModalFooter) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  /*eslint-disable react/prop-types */

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _createChainedFunction = _interopRequireDefault(_utilsCreateChainedFunction);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _FadeMixin2 = _interopRequireDefault(_FadeMixin);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _EventListener = _interopRequireDefault(_utilsEventListener);

  var _deprecationWarning = _interopRequireDefault(_utilsDeprecationWarning);

  var _Portal2 = _interopRequireDefault(_Portal);

  var _Body = _interopRequireDefault(_ModalBody);

  var _Header = _interopRequireDefault(_ModalHeader);

  var _Title = _interopRequireDefault(_ModalTitle);

  var _Footer = _interopRequireDefault(_ModalFooter);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

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

  function requiredIfNot(key, type) {
    return function (props, propName, componentName) {
      var propType = type;

      if (props[key] === undefined) {
        propType = propType.isRequired;
      }
      return propType(props, propName, componentName);
    };
  }

  function toChildArray(children) {
    var result = [];
    _React['default'].Children.forEach(children, function (c) {
      return result.push(c);
    });
    return result;
  }

  var currentFocusListener = undefined;

  /**
   * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
   * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
   *
   * We only allow one Listener at a time to avoid stack overflows
   *
   * @param  {ReactElement|HTMLElement} context
   * @param  {Function} handler
   */
  function onFocus(context, handler) {
    var doc = _domUtils['default'].ownerDocument(context);
    var useFocusin = !doc.addEventListener;
    var remove = undefined;

    if (currentFocusListener) {
      currentFocusListener.remove();
    }

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

    currentFocusListener = { remove: remove };

    return currentFocusListener;
  }

  var scrollbarSize = undefined;

  function getScrollbarSize() {
    if (scrollbarSize !== undefined) {
      return scrollbarSize;
    }

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

  var ModalMarkup = _React['default'].createClass({
    displayName: 'ModalMarkup',

    mixins: [_BootstrapMixin2['default'], _FadeMixin2['default']],

    propTypes: {
      /**
       * The Modal title text
       * @deprecated Use the "Modal.Header" component instead
       */
      title: _React['default'].PropTypes.node,
      /**
       * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
       */
      backdrop: _React['default'].PropTypes.oneOf(['static', true, false]),
      /**
       * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
       */
      keyboard: _React['default'].PropTypes.bool,

      /**
       * Specify whether the Modal heading should contain a close button
       * @deprecated Use the "Modal.Header" Component instead
       */
      closeButton: _React['default'].PropTypes.bool,

      /**
       * Open and close the Modal with a slide and fade animation.
       */
      animation: _React['default'].PropTypes.bool,
      /**
       * A Callback fired when the header closeButton or non-static backdrop is clicked.
       * @type {function}
       * @required
       */
      onHide: requiredIfNot('onRequestHide', _React['default'].PropTypes.func),

      /**
       * A Callback fired when the header closeButton or non-static backdrop is clicked.
       * @deprecated Replaced by `onHide`.
       */
      onRequestHide: _React['default'].PropTypes.func,

      /**
       * A css class to apply to the Modal dialog DOM node.
       */
      dialogClassName: _React['default'].PropTypes.string,

      /**
       * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
       * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
       */
      autoFocus: _React['default'].PropTypes.bool,

      /**
       * When `true` The modal will prevent focus from leaving the Modal while open.
       * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
       * such as screen readers.
       */
      enforceFocus: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'modal',
        backdrop: true,
        keyboard: true,
        animation: true,
        closeButton: true,

        autoFocus: true,
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
            { className: 'modal-content', role: 'document' },
            this.renderContent()
          )
        )
      );

      return this.props.backdrop ? this.renderBackdrop(modal, state.backdropStyles) : modal;
    },

    renderContent: function renderContent() {
      var _this = this;

      var children = toChildArray(this.props.children); // b/c createFragment is in addons and children can be a key'd object
      var hasNewHeader = children.some(function (c) {
        return c.type.__isModalHeader;
      });

      if (!hasNewHeader && this.props.title != null) {
        (0, _deprecationWarning['default'])('Specifying `closeButton` or `title` Modal props', 'the new Modal.Header, and Modal.Title components');

        children.unshift(_React['default'].createElement(
          _Header['default'],
          { closeButton: this.props.closeButton, onHide: this._getHide() },
          this.props.title && _React['default'].createElement(
            _Title['default'],
            null,
            this.props.title
          )
        ));
      }

      return _React['default'].Children.map(children, function (child) {
        // TODO: use context in 0.14
        if (child.type.__isModalHeader) {
          return (0, _react.cloneElement)(child, {
            onHide: (0, _createChainedFunction['default'])(_this._getHide(), child.props.onHide)
          });
        }
        return child;
      });
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

    _getHide: function _getHide() {
      if (!this.props.onHide && this.props.onRequestHide) {
        (0, _deprecationWarning['default'])('The Modal prop `onRequestHide`', 'the `onHide` prop');
      }

      return this.props.onHide || this.props.onRequestHide;
    },

    iosClickHack: function iosClickHack() {
      // IOS only allows click events to be delegated to the document on elements
      // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
      // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
      _React['default'].findDOMNode(this.refs.modal).onclick = function () {};
      _React['default'].findDOMNode(this.refs.backdrop).onclick = function () {};
    },

    componentWillMount: function componentWillMount() {
      this.checkForFocus();
    },

    componentDidMount: function componentDidMount() {
      var _this2 = this;

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
        container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + getScrollbarSize() + 'px';
      }

      if (this.props.backdrop) {
        this.iosClickHack();
      }

      this.setState(this._getStyles(), //eslint-disable-line react/no-did-mount-set-state
      function () {
        return _this2.focusModalContent();
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

      this._getHide()();
    },

    handleDocumentKeyUp: function handleDocumentKeyUp(e) {
      if (this.props.keyboard && e.keyCode === 27) {
        this._getHide()();
      }
    },

    handleWindowResize: function handleWindowResize() {
      this.setState(this._getStyles());
    },

    checkForFocus: function checkForFocus() {
      if (_domUtils['default'].canUseDom) {
        try {
          this.lastFocus = document.activeElement;
        } catch (e) {} // eslint-disable-line no-empty
      }
    },

    focusModalContent: function focusModalContent() {
      var modalContent = _React['default'].findDOMNode(this.refs.modal);
      var current = _domUtils['default'].activeElement(this);
      var focusInModal = current && _domUtils['default'].contains(modalContent, current);

      if (this.props.autoFocus && !focusInModal) {
        this.lastFocus = current;

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
          paddingRight: containerIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
          paddingLeft: !containerIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
        }
      };
    }
  });

  var Modal = _React['default'].createClass({
    displayName: 'Modal',

    propTypes: _extends({}, _Portal2['default'].propTypes, ModalMarkup.propTypes),

    defaultProps: {
      show: null
    },

    render: function render() {
      var _props = this.props;
      var show = _props.show;

      var props = _objectWithoutProperties(_props, ['show']);

      var modal = _React['default'].createElement(
        ModalMarkup,
        props,
        this.props.children
      );
      // I can't think of another way to not break back compat while defaulting container
      if (show != null) {
        return _React['default'].createElement(
          _Portal2['default'],
          { container: props.container },
          show && modal
        );
      } else {
        return modal;
      }
    }
  });

  Modal.Body = _Body['default'];
  Modal.Header = _Header['default'];
  Modal.Title = _Title['default'];
  Modal.Footer = _Footer['default'];

  module.exports = Modal;
});