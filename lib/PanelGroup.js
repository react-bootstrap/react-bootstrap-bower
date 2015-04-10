define(["exports", "module", "react", "classnames", "./BootstrapMixin", "./utils/ValidComponentChildren"], function (exports, module, _react, _classnames, _BootstrapMixin, _utilsValidComponentChildren) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  /* eslint react/prop-types: [1, {ignore: ["children", "className", "bsStyle"]}]*/
  /* BootstrapMixin contains `bsStyle` type validation */

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var classNames = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var PanelGroup = React.createClass({
    displayName: "PanelGroup",

    mixins: [BootstrapMixin],

    propTypes: {
      collapsable: React.PropTypes.bool,
      accordion: React.PropTypes.bool,
      activeKey: React.PropTypes.any,
      defaultActiveKey: React.PropTypes.any,
      onSelect: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "panel-group"
      };
    },

    getInitialState: function getInitialState() {
      var defaultActiveKey = this.props.defaultActiveKey;

      return {
        activeKey: defaultActiveKey
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();
      return React.createElement(
        "div",
        _extends({}, this.props, { className: classNames(this.props.className, classes), onSelect: null }),
        ValidComponentChildren.map(this.props.children, this.renderPanel)
      );
    },

    renderPanel: function renderPanel(child, index) {
      var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

      var props = {
        bsStyle: child.props.bsStyle || this.props.bsStyle,
        key: child.key ? child.key : index,
        ref: child.ref
      };

      if (this.props.accordion) {
        props.collapsable = true;
        props.expanded = child.props.eventKey === activeKey;
        props.onSelect = this.handleSelect;
      }

      return cloneElement(child, props);
    },

    shouldComponentUpdate: function shouldComponentUpdate() {
      // Defer any updates to this component during the `onSelect` handler.
      return !this._isChanging;
    },

    handleSelect: function handleSelect(e, key) {
      e.preventDefault();

      if (this.props.onSelect) {
        this._isChanging = true;
        this.props.onSelect(key);
        this._isChanging = false;
      }

      if (this.state.activeKey === key) {
        key = null;
      }

      this.setState({
        activeKey: key
      });
    }
  });

  module.exports = PanelGroup;
});