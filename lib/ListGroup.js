define(["exports", "module", "react", "./utils/ValidComponentChildren"], function (exports, module, _react, _utilsValidComponentChildren) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var ListGroup = React.createClass({
    displayName: "ListGroup",

    propTypes: {
      onClick: React.PropTypes.func
    },

    render: function render() {
      return React.createElement(
        "div",
        { className: "list-group" },
        ValidComponentChildren.map(this.props.children, this.renderListItem)
      );
    },

    renderListItem: function renderListItem(child, index) {
      return cloneElement(child, {
        key: child.key ? child.key : index
      });
    }
  });

  module.exports = ListGroup;
});