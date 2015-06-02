define(['exports', 'module', './childrenValueInputValidation', './createChainedFunction', './CustomPropTypes', './domUtils', './ValidComponentChildren'], function (exports, module, _childrenValueInputValidation, _createChainedFunction, _CustomPropTypes, _domUtils, _ValidComponentChildren) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _childrenValueInputValidation2 = _interopRequireDefault(_childrenValueInputValidation);

  var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

  var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

  var _domUtils2 = _interopRequireDefault(_domUtils);

  var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

  module.exports = {
    childrenValueInputValidation: _childrenValueInputValidation2['default'],
    createChainedFunction: _createChainedFunction2['default'],
    CustomPropTypes: _CustomPropTypes2['default'],
    domUtils: _domUtils2['default'],
    ValidComponentChildren: _ValidComponentChildren2['default']
  };
});