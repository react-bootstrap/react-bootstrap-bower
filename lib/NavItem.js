define(["exports", "module", "react", "classnames", "./BootstrapMixin"], function (exports, module, _react, _classnames, _BootstrapMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var NavItem = React.createClass({
    displayName: "NavItem",

    mixins: [BootstrapMixin],

    propTypes: {
      onSelect: React.PropTypes.func,
      active: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      href: React.PropTypes.string,
      title: React.PropTypes.node,
      eventKey: React.PropTypes.any,
      target: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        href: "#"
      };
    },

    render: function render() {
      var _props = this.props;
      var disabled = _props.disabled;
      var active = _props.active;
      var href = _props.href;
      var title = _props.title;
      var target = _props.target;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ["disabled", "active", "href", "title", "target", "children"]);

      var classes = {
        active: active,
        disabled: disabled
      };
      var linkProps = {
        href: href,
        title: title,
        target: target,
        onClick: this.handleClick,
        ref: "anchor"
      };

      if (href === "#") {
        linkProps.role = "button";
      }

      return React.createElement(
        "li",
        _extends({}, props, { className: classSet(props.className, classes) }),
        React.createElement(
          "a",
          linkProps,
          children
        )
      );
    },

    handleClick: function handleClick(e) {
      if (this.props.onSelect) {
        e.preventDefault();

        if (!this.props.disabled) {
          this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
        }
      }
    }
  });

  module.exports = NavItem;
});