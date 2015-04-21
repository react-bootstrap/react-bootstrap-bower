define(["exports", "module", "react", "classnames", "./BootstrapMixin", "./styleMaps"], function (exports, module, _react, _classnames, _BootstrapMixin, _styleMaps) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classNames = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var styleMaps = _interopRequire(_styleMaps);

  var Glyphicon = React.createClass({
    displayName: "Glyphicon",

    mixins: [BootstrapMixin],

    propTypes: {
      glyph: React.PropTypes.oneOf(styleMaps.GLYPHS).isRequired
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "glyphicon"
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();

      classes["glyphicon-" + this.props.glyph] = true;

      return React.createElement(
        "span",
        _extends({}, this.props, { className: classNames(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = Glyphicon;
});