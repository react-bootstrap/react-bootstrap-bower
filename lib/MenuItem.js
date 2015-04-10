define(["exports", "module", "react", "classnames"], function (exports, module, _react, _classnames) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classNames = _interopRequire(_classnames);

  var MenuItem = React.createClass({
    displayName: "MenuItem",

    propTypes: {
      header: React.PropTypes.bool,
      divider: React.PropTypes.bool,
      href: React.PropTypes.string,
      title: React.PropTypes.string,
      target: React.PropTypes.string,
      onSelect: React.PropTypes.func,
      eventKey: React.PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        href: "#"
      };
    },

    handleClick: function handleClick(e) {
      if (this.props.onSelect) {
        e.preventDefault();
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    },

    renderAnchor: function renderAnchor() {
      return React.createElement(
        "a",
        { onClick: this.handleClick, href: this.props.href, target: this.props.target, title: this.props.title, tabIndex: "-1" },
        this.props.children
      );
    },

    render: function render() {
      var classes = {
        "dropdown-header": this.props.header,
        divider: this.props.divider
      };

      var children = null;
      if (this.props.header) {
        children = this.props.children;
      } else if (!this.props.divider) {
        children = this.renderAnchor();
      }

      return React.createElement(
        "li",
        _extends({}, this.props, { role: "presentation", title: null, href: null,
          className: classNames(this.props.className, classes) }),
        children
      );
    }
  });

  module.exports = MenuItem;
});