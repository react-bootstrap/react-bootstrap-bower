define(["exports", "module", "react", "classnames", "./constants"], function (exports, module, _react, _classnames, _constants) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var constants = _interopRequire(_constants);

  var Col = React.createClass({
    displayName: "Col",

    propTypes: {
      xs: React.PropTypes.number,
      sm: React.PropTypes.number,
      md: React.PropTypes.number,
      lg: React.PropTypes.number,
      xsOffset: React.PropTypes.number,
      smOffset: React.PropTypes.number,
      mdOffset: React.PropTypes.number,
      lgOffset: React.PropTypes.number,
      xsPush: React.PropTypes.number,
      smPush: React.PropTypes.number,
      mdPush: React.PropTypes.number,
      lgPush: React.PropTypes.number,
      xsPull: React.PropTypes.number,
      smPull: React.PropTypes.number,
      mdPull: React.PropTypes.number,
      lgPull: React.PropTypes.number,
      componentClass: React.PropTypes.node.isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        componentClass: "div"
      };
    },

    render: function render() {
      var ComponentClass = this.props.componentClass;
      var classes = {};

      Object.keys(constants.SIZES).forEach(function (key) {
        var size = constants.SIZES[key];
        var prop = size;
        var classPart = size + "-";

        if (this.props[prop]) {
          classes["col-" + classPart + this.props[prop]] = true;
        }

        prop = size + "Offset";
        classPart = size + "-offset-";
        if (this.props[prop] >= 0) {
          classes["col-" + classPart + this.props[prop]] = true;
        }

        prop = size + "Push";
        classPart = size + "-push-";
        if (this.props[prop] >= 0) {
          classes["col-" + classPart + this.props[prop]] = true;
        }

        prop = size + "Pull";
        classPart = size + "-pull-";
        if (this.props[prop] >= 0) {
          classes["col-" + classPart + this.props[prop]] = true;
        }
      }, this);

      return React.createElement(
        ComponentClass,
        _extends({}, this.props, { className: classSet(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Col;
});