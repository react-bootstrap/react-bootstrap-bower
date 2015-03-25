define(["exports", "module", "react", "./utils/ValidComponentChildren", "./utils/Object.assign"], function (exports, module, _react, _utilsValidComponentChildren, _utilsObjectAssign) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  // https://www.npmjs.org/package/react-interpolate-component
  // TODO: Drop this in favor of es6 string interpolation

  var React = _interopRequire(_react);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var assign = _interopRequire(_utilsObjectAssign);

  var REGEXP = /\%\((.+?)\)s/;

  var Interpolate = React.createClass({
    displayName: "Interpolate",

    propTypes: {
      format: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return { component: "span" };
    },

    render: function render() {
      var format = ValidComponentChildren.hasValidComponent(this.props.children) || typeof this.props.children === "string" ? this.props.children : this.props.format;
      var parent = this.props.component;
      var unsafe = this.props.unsafe === true;
      var props = assign({}, this.props);

      delete props.children;
      delete props.format;
      delete props.component;
      delete props.unsafe;

      if (unsafe) {
        var content = format.split(REGEXP).reduce(function (memo, match, index) {
          var html = undefined;

          if (index % 2 === 0) {
            html = match;
          } else {
            html = props[match];
            delete props[match];
          }

          if (React.isValidElement(html)) {
            throw new Error("cannot interpolate a React component into unsafe text");
          }

          memo += html;

          return memo;
        }, "");

        props.dangerouslySetInnerHTML = { __html: content };

        return React.createElement(parent, props);
      } else {
        var kids = format.split(REGEXP).reduce(function (memo, match, index) {
          var child = undefined;

          if (index % 2 === 0) {
            if (match.length === 0) {
              return memo;
            }

            child = match;
          } else {
            child = props[match];
            delete props[match];
          }

          memo.push(child);

          return memo;
        }, []);

        return React.createElement(parent, props, kids);
      }
    }
  });

  module.exports = Interpolate;
});