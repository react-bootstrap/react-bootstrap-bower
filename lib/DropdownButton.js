define(["exports", "module", "react", "classnames", "./utils/createChainedFunction", "./BootstrapMixin", "./DropdownStateMixin", "./Button", "./ButtonGroup", "./DropdownMenu", "./utils/ValidComponentChildren"], function (exports, module, _react, _classnames, _utilsCreateChainedFunction, _BootstrapMixin, _DropdownStateMixin, _Button, _ButtonGroup, _DropdownMenu, _utilsValidComponentChildren) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var classNames = _interopRequire(_classnames);

  var createChainedFunction = _interopRequire(_utilsCreateChainedFunction);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var DropdownStateMixin = _interopRequire(_DropdownStateMixin);

  var Button = _interopRequire(_Button);

  var ButtonGroup = _interopRequire(_ButtonGroup);

  var DropdownMenu = _interopRequire(_DropdownMenu);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var DropdownButton = React.createClass({
    displayName: "DropdownButton",

    mixins: [BootstrapMixin, DropdownStateMixin],

    propTypes: {
      pullRight: React.PropTypes.bool,
      dropup: React.PropTypes.bool,
      title: React.PropTypes.node,
      href: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      navItem: React.PropTypes.bool,
      noCaret: React.PropTypes.bool
    },

    render: function render() {
      var renderMethod = this.props.navItem ? "renderNavItem" : "renderButtonGroup";

      var caret = this.props.noCaret ? null : React.createElement("span", { className: "caret" });

      return this[renderMethod]([React.createElement(
        Button,
        _extends({}, this.props, {
          ref: "dropdownButton",
          className: "dropdown-toggle",
          onClick: this.handleDropdownClick,
          key: 0,
          navDropdown: this.props.navItem,
          navItem: null,
          title: null,
          pullRight: null,
          dropup: null }),
        this.props.title,
        " ",
        caret
      ), React.createElement(
        DropdownMenu,
        {
          ref: "menu",
          "aria-labelledby": this.props.id,
          pullRight: this.props.pullRight,
          key: 1 },
        ValidComponentChildren.map(this.props.children, this.renderMenuItem)
      )]);
    },

    renderButtonGroup: function renderButtonGroup(children) {
      var groupClasses = {
        open: this.state.open,
        dropup: this.props.dropup
      };

      return React.createElement(
        ButtonGroup,
        {
          bsSize: this.props.bsSize,
          className: classNames(this.props.className, groupClasses) },
        children
      );
    },

    renderNavItem: function renderNavItem(children) {
      var classes = {
        dropdown: true,
        open: this.state.open,
        dropup: this.props.dropup
      };

      return React.createElement(
        "li",
        { className: classNames(this.props.className, classes) },
        children
      );
    },

    renderMenuItem: function renderMenuItem(child, index) {
      // Only handle the option selection if an onSelect prop has been set on the
      // component or it's child, this allows a user not to pass an onSelect
      // handler and have the browser preform the default action.
      var handleOptionSelect = this.props.onSelect || child.props.onSelect ? this.handleOptionSelect : null;

      return cloneElement(child, {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, handleOptionSelect),
        key: child.key ? child.key : index
      });
    },

    handleDropdownClick: function handleDropdownClick(e) {
      e.preventDefault();

      this.setDropdownState(!this.state.open);
    },

    handleOptionSelect: function handleOptionSelect(key) {
      if (this.props.onSelect) {
        this.props.onSelect(key);
      }

      this.setDropdownState(false);
    }
  });

  module.exports = DropdownButton;
});