define(["exports", "module", "react", "classnames"], function (exports, module, _react, _classnames) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classNames = _interopRequire(_classnames);

  var Table = React.createClass({
    displayName: "Table",

    propTypes: {
      striped: React.PropTypes.bool,
      bordered: React.PropTypes.bool,
      condensed: React.PropTypes.bool,
      hover: React.PropTypes.bool,
      responsive: React.PropTypes.bool
    },

    render: function render() {
      var classes = {
        table: true,
        "table-striped": this.props.striped,
        "table-bordered": this.props.bordered,
        "table-condensed": this.props.condensed,
        "table-hover": this.props.hover
      };
      var table = React.createElement(
        "table",
        _extends({}, this.props, { className: classNames(this.props.className, classes) }),
        this.props.children
      );

      return this.props.responsive ? React.createElement(
        "div",
        { className: "table-responsive" },
        table
      ) : table;
    }
  });

  module.exports = Table;
});