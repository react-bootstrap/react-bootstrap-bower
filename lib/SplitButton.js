define(["exports", "module", "react", "classnames", "./BootstrapMixin", "./DropdownStateMixin", "./Button", "./ButtonGroup", "./DropdownMenu"], function (exports, module, _react, _classnames, _BootstrapMixin, _DropdownStateMixin, _Button, _ButtonGroup, _DropdownMenu) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var DropdownStateMixin = _interopRequire(_DropdownStateMixin);

  var Button = _interopRequire(_Button);

  var ButtonGroup = _interopRequire(_ButtonGroup);

  var DropdownMenu = _interopRequire(_DropdownMenu);

  var SplitButton = React.createClass({
    displayName: "SplitButton",

    mixins: [BootstrapMixin, DropdownStateMixin],

    propTypes: {
      pullRight: React.PropTypes.bool,
      title: React.PropTypes.node,
      href: React.PropTypes.string,
      id: React.PropTypes.string,
      target: React.PropTypes.string,
      dropdownTitle: React.PropTypes.node,
      onClick: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      disabled: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        dropdownTitle: "Toggle dropdown"
      };
    },

    render: function render() {
      var groupClasses = {
        open: this.state.open,
        dropup: this.props.dropup
      };

      var button = React.createElement(
        Button,
        _extends({}, this.props, {
          ref: "button",
          onClick: this.handleButtonClick,
          title: null,
          id: null }),
        this.props.title
      );

      var dropdownButton = React.createElement(
        Button,
        _extends({}, this.props, {
          ref: "dropdownButton",
          className: classSet(this.props.className, "dropdown-toggle"),
          onClick: this.handleDropdownClick,
          title: null,
          href: null,
          target: null,
          id: null }),
        React.createElement(
          "span",
          { className: "sr-only" },
          this.props.dropdownTitle
        ),
        React.createElement("span", { className: "caret" }),
        React.createElement(
          "span",
          { style: { letterSpacing: "-.3em" } },
          " "
        )
      );

      return React.createElement(
        ButtonGroup,
        {
          bsSize: this.props.bsSize,
          className: classSet(groupClasses),
          id: this.props.id },
        button,
        dropdownButton,
        React.createElement(
          DropdownMenu,
          {
            ref: "menu",
            onSelect: this.handleOptionSelect,
            "aria-labelledby": this.props.id,
            pullRight: this.props.pullRight },
          this.props.children
        )
      );
    },

    handleButtonClick: function handleButtonClick(e) {
      if (this.state.open) {
        this.setDropdownState(false);
      }

      if (this.props.onClick) {
        this.props.onClick(e, this.props.href, this.props.target);
      }
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

  module.exports = SplitButton;
});