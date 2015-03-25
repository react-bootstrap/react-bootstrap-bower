define(["exports", "module", "react", "classnames", "./BootstrapMixin"], function (exports, module, _react, _classnames, _BootstrapMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var Button = React.createClass({
    displayName: "Button",

    mixins: [BootstrapMixin],

    propTypes: {
      active: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      block: React.PropTypes.bool,
      navItem: React.PropTypes.bool,
      navDropdown: React.PropTypes.bool,
      componentClass: React.PropTypes.node,
      href: React.PropTypes.string,
      target: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "button",
        bsStyle: "default",
        type: "button"
      };
    },

    render: function render() {
      var classes = this.props.navDropdown ? {} : this.getBsClassSet();
      var renderFuncName = undefined;

      classes = _extends({
        active: this.props.active,
        "btn-block": this.props.block }, classes);

      if (this.props.navItem) {
        return this.renderNavItem(classes);
      }

      renderFuncName = this.props.href || this.props.target || this.props.navDropdown ? "renderAnchor" : "renderButton";

      return this[renderFuncName](classes);
    },

    renderAnchor: function renderAnchor(classes) {

      var Component = this.props.componentClass || "a";
      var href = this.props.href || "#";
      classes.disabled = this.props.disabled;

      return React.createElement(
        Component,
        _extends({}, this.props, {
          href: href,
          className: classSet(this.props.className, classes),
          role: "button" }),
        this.props.children
      );
    },

    renderButton: function renderButton(classes) {
      var Component = this.props.componentClass || "button";

      return React.createElement(
        Component,
        _extends({}, this.props, {
          className: classSet(this.props.className, classes) }),
        this.props.children
      );
    },

    renderNavItem: function renderNavItem(classes) {
      var liClasses = {
        active: this.props.active
      };

      return React.createElement(
        "li",
        { className: classSet(liClasses) },
        this.renderAnchor(classes)
      );
    }
  });

  module.exports = Button;
});