define(["exports", "module", "react", "classnames", "./utils/createChainedFunction", "./utils/ValidComponentChildren"], function (exports, module, _react, _classnames, _utilsCreateChainedFunction, _utilsValidComponentChildren) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var classNames = _interopRequire(_classnames);

  var createChainedFunction = _interopRequire(_utilsCreateChainedFunction);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var DropdownMenu = React.createClass({
    displayName: "DropdownMenu",

    propTypes: {
      pullRight: React.PropTypes.bool,
      onSelect: React.PropTypes.func
    },

    render: function render() {
      var classes = {
        "dropdown-menu": true,
        "dropdown-menu-right": this.props.pullRight
      };

      return React.createElement(
        "ul",
        _extends({}, this.props, {
          className: classNames(this.props.className, classes),
          role: "menu" }),
        ValidComponentChildren.map(this.props.children, this.renderMenuItem)
      );
    },

    renderMenuItem: function renderMenuItem(child, index) {
      return cloneElement(child, {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index
      });
    }
  });

  module.exports = DropdownMenu;
});