define(['exports', 'module', 'react', './BootstrapMixin', './utils/ValidComponentChildren', './Nav', './NavItem'], function (exports, module, _react, _BootstrapMixin, _utilsValidComponentChildren, _Nav, _NavItem) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  var _React = _interopRequireDefault(_react);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  var _Nav2 = _interopRequireDefault(_Nav);

  var _NavItem2 = _interopRequireDefault(_NavItem);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var panelId = function panelId(props, child) {
    return child.props.id ? child.props.id : props.id && props.id + '___panel___' + child.props.eventKey;
  };
  var tabId = function tabId(props, child) {
    return child.props.id ? child.props.id + '___tab' : props.id && props.id + '___tab___' + child.props.eventKey;
  };

  function getDefaultActiveKeyFromChildren(children) {
    var defaultActiveKey = undefined;

    _ValidComponentChildren['default'].forEach(children, function (child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });

    return defaultActiveKey;
  }

  var TabbedArea = _React['default'].createClass({
    displayName: 'TabbedArea',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      activeKey: _React['default'].PropTypes.any,
      defaultActiveKey: _React['default'].PropTypes.any,
      bsStyle: _React['default'].PropTypes.oneOf(['tabs', 'pills']),
      animation: _React['default'].PropTypes.bool,
      id: _React['default'].PropTypes.string,
      onSelect: _React['default'].PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsStyle: 'tabs',
        animation: true
      };
    },

    getInitialState: function getInitialState() {
      var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

      return {
        activeKey: defaultActiveKey,
        previousActiveKey: null
      };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
        this.setState({
          previousActiveKey: this.props.activeKey
        });
      }
    },

    handlePaneAnimateOutEnd: function handlePaneAnimateOutEnd() {
      this.setState({
        previousActiveKey: null
      });
    },

    render: function render() {
      var _props = this.props;
      var id = _props.id;

      var props = _objectWithoutProperties(_props, ['id']);

      var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

      function renderTabIfSet(child) {
        return child.props.tab != null ? this.renderTab(child) : null;
      }

      var nav = _React['default'].createElement(
        _Nav2['default'],
        _extends({}, props, { activeKey: activeKey, onSelect: this.handleSelect, ref: 'tabs' }),
        _ValidComponentChildren['default'].map(this.props.children, renderTabIfSet, this)
      );

      return _React['default'].createElement(
        'div',
        null,
        nav,
        _React['default'].createElement(
          'div',
          { id: id, className: 'tab-content', ref: 'panes' },
          _ValidComponentChildren['default'].map(this.props.children, this.renderPane)
        )
      );
    },

    getActiveKey: function getActiveKey() {
      return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
    },

    renderPane: function renderPane(child, index) {
      var activeKey = this.getActiveKey();

      var active = child.props.eventKey === activeKey && (this.state.previousActiveKey == null || !this.props.animation);

      return (0, _react.cloneElement)(child, {
        active: active,
        id: panelId(this.props, child),
        'aria-labelledby': tabId(this.props, child),
        key: child.key ? child.key : index,
        animation: this.props.animation,
        onAnimateOutEnd: this.state.previousActiveKey != null && child.props.eventKey === this.state.previousActiveKey ? this.handlePaneAnimateOutEnd : null
      });
    },

    renderTab: function renderTab(child) {
      var _child$props = child.props;
      var eventKey = _child$props.eventKey;
      var className = _child$props.className;
      var tab = _child$props.tab;
      var disabled = _child$props.disabled;

      return _React['default'].createElement(
        _NavItem2['default'],
        {
          linkId: tabId(this.props, child),
          ref: 'tab' + eventKey,
          'aria-controls': panelId(this.props, child),
          eventKey: eventKey,
          className: className,
          disabled: disabled },
        tab
      );
    },

    shouldComponentUpdate: function shouldComponentUpdate() {
      // Defer any updates to this component during the `onSelect` handler.
      return !this._isChanging;
    },

    handleSelect: function handleSelect(key) {
      if (this.props.onSelect) {
        this._isChanging = true;
        this.props.onSelect(key);
        this._isChanging = false;
      } else if (key !== this.getActiveKey()) {
        this.setState({
          activeKey: key,
          previousActiveKey: this.getActiveKey()
        });
      }
    }
  });

  module.exports = TabbedArea;
});