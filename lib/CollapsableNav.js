define(['exports', 'module', 'react', './utils/deprecationWarning', './utils/Object.assign', './CollapsibleNav'], function (exports, module, _react, _utilsDeprecationWarning, _utilsObjectAssign, _CollapsibleNav) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _deprecationWarning = _interopRequire(_utilsDeprecationWarning);

  var _assign = _interopRequire(_utilsObjectAssign);

  var specCollapsableNav = (0, _assign)({}, _CollapsibleNav.specCollapsibleNav, {
    componentDidMount: function componentDidMount() {
      (0, _deprecationWarning)('CollapsableNav', 'CollapsibleNav', 'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963');
    }
  });

  var CollapsableNav = _React.createClass(specCollapsableNav);

  module.exports = CollapsableNav;
});