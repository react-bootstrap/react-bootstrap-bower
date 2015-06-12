define(['exports', 'module', 'react', './CustomPropTypes'], function (exports, module, _react, _CustomPropTypes) {
  'use strict';

  module.exports = valueValidation;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var propList = ['children', 'value'];
  var typeList = [_React['default'].PropTypes.number, _React['default'].PropTypes.string];

  function valueValidation(props, propName, componentName) {
    var error = (0, _CustomPropTypes.singlePropFrom)(propList)(props, propName, componentName);
    if (!error) {
      var oneOfType = _React['default'].PropTypes.oneOfType(typeList);
      error = oneOfType(props, propName, componentName);
    }
    return error;
  }
});