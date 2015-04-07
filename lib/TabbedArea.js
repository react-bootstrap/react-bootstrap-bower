define(["exports", "module", "react", "./BootstrapMixin", "./utils/ValidComponentChildren", "./Nav", "./NavItem"], function (exports, module, _react, _BootstrapMixin, _utilsValidComponentChildren, _Nav, _NavItem) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var Nav = _interopRequire(_Nav);

  var NavItem = _interopRequire(_NavItem);

  function getDefaultActiveKeyFromChildren(children) {
    var defaultActiveKey = undefined;

    ValidComponentChildren.forEach(children, function (child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });

    return defaultActiveKey;
  }

  var TabbedArea = React.createClass({
    displayName: "TabbedArea",

    mixins: [BootstrapMixin],

    propTypes: {
      activeKey: React.PropTypes.any,
      defaultActiveKey: React.PropTypes.any,
      bsStyle: React.PropTypes.oneOf(["tabs", "pills"]),
      animation: React.PropTypes.bool,
      id: React.PropTypes.string,
      onSelect: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsStyle: "tabs",
        animation: true
      };
    },

    getInitialState: function getInitialState() {
      var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

      // TODO: In __DEV__ mode warn via `console.warn` if no `defaultActiveKey` has
      // been set by this point, invalid children or missing key properties are likely the cause.

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
      var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

      function renderTabIfSet(child) {
        return child.props.tab != null ? this.renderTab(child) : null;
      }

      var nav = React.createElement(
        Nav,
        _extends({}, this.props, { activeKey: activeKey, onSelect: this.handleSelect, ref: "tabs" }),
        ValidComponentChildren.map(this.props.children, renderTabIfSet, this)
      );

      return React.createElement(
        "div",
        null,
        nav,
        React.createElement(
          "div",
          { id: this.props.id, className: "tab-content", ref: "panes" },
          ValidComponentChildren.map(this.props.children, this.renderPane)
        )
      );
    },

    getActiveKey: function getActiveKey() {
      return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
    },

    renderPane: function renderPane(child, index) {
      var activeKey = this.getActiveKey();

      return cloneElement(child, {
        active: child.props.eventKey === activeKey && (this.state.previousActiveKey == null || !this.props.animation),
        key: child.key ? child.key : index,
        animation: this.props.animation,
        onAnimateOutEnd: this.state.previousActiveKey != null && child.props.eventKey === this.state.previousActiveKey ? this.handlePaneAnimateOutEnd : null
      });
    },

    renderTab: function renderTab(child) {
      var key = child.props.eventKey;
      return React.createElement(
        NavItem,
        {
          ref: "tab" + key,
          eventKey: key },
        child.props.tab
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