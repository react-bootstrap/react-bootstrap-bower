define(["exports", "module", "react", "classnames"], function (exports, module, _react, _classnames) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var PageItem = React.createClass({
    displayName: "PageItem",

    propTypes: {
      href: React.PropTypes.string,
      target: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      previous: React.PropTypes.bool,
      next: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      eventKey: React.PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        href: "#"
      };
    },

    render: function render() {
      var classes = {
        disabled: this.props.disabled,
        previous: this.props.previous,
        next: this.props.next
      };

      return React.createElement(
        "li",
        _extends({}, this.props, {
          className: classSet(this.props.className, classes) }),
        React.createElement(
          "a",
          {
            href: this.props.href,
            title: this.props.title,
            target: this.props.target,
            onClick: this.handleSelect,
            ref: "anchor" },
          this.props.children
        )
      );
    },

    handleSelect: function handleSelect(e) {
      if (this.props.onSelect) {
        e.preventDefault();

        if (!this.props.disabled) {
          this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
        }
      }
    }
  });

  module.exports = PageItem;
});