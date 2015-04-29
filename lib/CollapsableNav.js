define(['exports', 'module', './utils/deprecationWarning', './CollapsibleNav'], function (exports, module, _utilsDeprecationWarning, _CollapsibleNav) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _deprecationWarning = _interopRequire(_utilsDeprecationWarning);

  var _CollapsibleNav2 = _interopRequire(_CollapsibleNav);

  var CollapsableNav = _CollapsibleNav2;

  _deprecationWarning('CollapsableNav', 'CollapsibleNav', 'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963');

  module.exports = CollapsableNav;
});