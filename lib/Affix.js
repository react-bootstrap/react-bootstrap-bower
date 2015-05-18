define(['exports', 'module', 'react', 'classnames', './AffixMixin', './utils/domUtils'], function (exports, module, _react, _classnames, _AffixMixin, _utilsDomUtils) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _classNames = _interopRequire(_classnames);

  var _AffixMixin2 = _interopRequire(_AffixMixin);

  var _domUtils = _interopRequire(_utilsDomUtils);

  var Affix = _React.createClass({
    displayName: 'Affix',

    statics: {
      domUtils: _domUtils
    },

    mixins: [_AffixMixin2],

    render: function render() {
      var holderStyle = { top: this.state.affixPositionTop };

      return _React.createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classNames)(this.props.className, this.state.affixClass),
          style: holderStyle }),
        this.props.children
      );
    }
  });

  module.exports = Affix;
});