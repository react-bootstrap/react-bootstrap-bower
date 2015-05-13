define(['exports', 'module', 'react', './deprecationWarning'], function (exports, module, _react, _deprecationWarning) {
  'use strict';

  module.exports = collapsable;

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _deprecationWarning2 = _interopRequire(_deprecationWarning);

  function collapsable(props, propName, componentName) {
    if (props[propName] !== undefined) {
      (0, _deprecationWarning2)('' + propName + ' in ' + componentName, 'collapsible', 'https://github.com/react-bootstrap/react-bootstrap/issues/425');
    }
    return _React.PropTypes.bool.call(null, props, propName, componentName);
  }
});