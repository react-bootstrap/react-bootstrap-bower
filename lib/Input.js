define(["exports", "module", "react", "classnames", "./Button", "./FormGroup"], function (exports, module, _react, _classnames, _Button, _FormGroup) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var Button = _interopRequire(_Button);

  var FormGroup = _interopRequire(_FormGroup);

  var Input = React.createClass({
    displayName: "Input",

    propTypes: {
      type: React.PropTypes.string,
      label: React.PropTypes.node,
      help: React.PropTypes.node,
      addonBefore: React.PropTypes.node,
      addonAfter: React.PropTypes.node,
      buttonBefore: React.PropTypes.node,
      buttonAfter: React.PropTypes.node,
      bsSize: React.PropTypes.oneOf(["small", "medium", "large"]),
      bsStyle: function bsStyle(props) {
        if (props.type === "submit") {
          // Return early if `type=submit` as the `Button` component
          // it transfers these props to has its own propType checks.
          return null;
        }

        return React.PropTypes.oneOf(["success", "warning", "error"]).apply(null, arguments);
      },
      hasFeedback: React.PropTypes.bool,
      id: React.PropTypes.string,
      groupClassName: React.PropTypes.string,
      wrapperClassName: React.PropTypes.string,
      labelClassName: React.PropTypes.string,
      disabled: React.PropTypes.bool
    },

    getInputDOMNode: function getInputDOMNode() {
      return React.findDOMNode(this.refs.input);
    },

    getValue: function getValue() {
      if (this.props.type === "static") {
        return this.props.value;
      } else if (this.props.type) {
        if (this.props.type === "select" && this.props.multiple) {
          return this.getSelectedOptions();
        } else {
          return this.getInputDOMNode().value;
        }
      } else {
        throw "Cannot use getValue without specifying input type.";
      }
    },

    getChecked: function getChecked() {
      return this.getInputDOMNode().checked;
    },

    getSelectedOptions: function getSelectedOptions() {
      var values = [];

      Array.prototype.forEach.call(this.getInputDOMNode().getElementsByTagName("option"), function (option) {
        if (option.selected) {
          var value = option.getAttribute("value") || option.innerHTML;

          values.push(value);
        }
      });

      return values;
    },

    isCheckboxOrRadio: function isCheckboxOrRadio() {
      return this.props.type === "radio" || this.props.type === "checkbox";
    },

    isFile: function isFile() {
      return this.props.type === "file";
    },

    renderInput: function renderInput() {
      var input = null;

      if (!this.props.type) {
        return this.props.children;
      }

      switch (this.props.type) {
        case "select":
          input = React.createElement(
            "select",
            _extends({}, this.props, { className: classSet(this.props.className, "form-control"), ref: "input", key: "input" }),
            this.props.children
          );
          break;
        case "textarea":
          input = React.createElement("textarea", _extends({}, this.props, { className: classSet(this.props.className, "form-control"), ref: "input", key: "input" }));
          break;
        case "static":
          input = React.createElement(
            "p",
            _extends({}, this.props, { className: classSet(this.props.className, "form-control-static"), ref: "input", key: "input" }),
            this.props.value
          );
          break;
        case "submit":
          input = React.createElement(Button, _extends({}, this.props, { componentClass: "input", ref: "input", key: "input" }));
          break;
        default:
          var className = this.isCheckboxOrRadio() || this.isFile() ? "" : "form-control";
          input = React.createElement("input", _extends({}, this.props, { className: classSet(this.props.className, className), ref: "input", key: "input" }));
      }

      return input;
    },

    renderInputGroup: function renderInputGroup(children) {
      var addonBefore = this.props.addonBefore ? React.createElement(
        "span",
        { className: "input-group-addon", key: "addonBefore" },
        this.props.addonBefore
      ) : null;

      var addonAfter = this.props.addonAfter ? React.createElement(
        "span",
        { className: "input-group-addon", key: "addonAfter" },
        this.props.addonAfter
      ) : null;

      var buttonBefore = this.props.buttonBefore ? React.createElement(
        "span",
        { className: "input-group-btn" },
        this.props.buttonBefore
      ) : null;

      var buttonAfter = this.props.buttonAfter ? React.createElement(
        "span",
        { className: "input-group-btn" },
        this.props.buttonAfter
      ) : null;

      var inputGroupClassName = undefined;
      switch (this.props.bsSize) {
        case "small":
          inputGroupClassName = "input-group-sm";break;
        case "large":
          inputGroupClassName = "input-group-lg";break;
      }

      return addonBefore || addonAfter || buttonBefore || buttonAfter ? React.createElement(
        "div",
        { className: classSet(inputGroupClassName, "input-group"), key: "input-group" },
        addonBefore,
        buttonBefore,
        children,
        addonAfter,
        buttonAfter
      ) : children;
    },

    renderIcon: function renderIcon() {
      var classes = {
        glyphicon: true,
        "form-control-feedback": true,
        "glyphicon-ok": this.props.bsStyle === "success",
        "glyphicon-warning-sign": this.props.bsStyle === "warning",
        "glyphicon-remove": this.props.bsStyle === "error"
      };

      return this.props.hasFeedback ? React.createElement("span", { className: classSet(classes), key: "icon" }) : null;
    },

    renderHelp: function renderHelp() {
      return this.props.help ? React.createElement(
        "span",
        { className: "help-block", key: "help" },
        this.props.help
      ) : null;
    },

    renderCheckboxandRadioWrapper: function renderCheckboxandRadioWrapper(children) {
      var classes = {
        checkbox: this.props.type === "checkbox",
        radio: this.props.type === "radio"
      };

      return React.createElement(
        "div",
        { className: classSet(classes), key: "checkboxRadioWrapper" },
        children
      );
    },

    renderWrapper: function renderWrapper(children) {
      return this.props.wrapperClassName ? React.createElement(
        "div",
        { className: this.props.wrapperClassName, key: "wrapper" },
        children
      ) : children;
    },

    renderLabel: function renderLabel(children) {
      var classes = {
        "control-label": !this.isCheckboxOrRadio()
      };
      classes[this.props.labelClassName] = this.props.labelClassName;

      return this.props.label ? React.createElement(
        "label",
        { htmlFor: this.props.id, className: classSet(classes), key: "label" },
        children,
        this.props.label
      ) : children;
    },

    render: function render() {
      var children = undefined;

      if (this.isCheckboxOrRadio()) {
        children = this.renderWrapper([this.renderCheckboxandRadioWrapper(this.renderLabel(this.renderInput())), this.renderHelp()]);
      } else {
        children = [this.renderLabel(), this.renderWrapper([this.renderInputGroup(this.renderInput()), this.renderIcon(), this.renderHelp()])];
      }

      return React.createElement(
        FormGroup,
        this.props,
        children
      );
    }
  });

  module.exports = Input;
});