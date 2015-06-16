define(['exports', 'module', 'react', './utils/ValidComponentChildren'], function (exports, module, _react, _utilsValidComponentChildren) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  // https://www.npmjs.org/package/react-interpolate-component
  // TODO: Drop this in favor of es6 string interpolation

  var _React = _interopRequireDefault(_react);

  var _ValidComponentChildren = _interopRequireDefault(_utilsValidComponentChildren);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var REGEXP = /\%\((.+?)\)s/;

  var Interpolate = _React['default'].createClass({
    displayName: 'Interpolate',

    propTypes: {
      format: _React['default'].PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return { component: 'span' };
    },

    render: function render() {
      var format = _ValidComponentChildren['default'].hasValidComponent(this.props.children) || typeof this.props.children === 'string' ? this.props.children : this.props.format;
      var parent = this.props.component;
      var unsafe = this.props.unsafe === true;
      var props = _extends({}, this.props);

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

          if (_React['default'].isValidElement(html)) {
            throw new Error('cannot interpolate a React component into unsafe text');
          }

          memo += html;

          return memo;
        }, '');

        props.dangerouslySetInnerHTML = { __html: content };

        return _React['default'].createElement(parent, props);
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

        return _React['default'].createElement(parent, props, kids);
      }
    }
  });

  module.exports = Interpolate;
});