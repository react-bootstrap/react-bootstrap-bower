define(['exports', 'module', 'react', './utils/CustomPropTypes', './OverlayMixin'], function (exports, module, _react, _utilsCustomPropTypes, _OverlayMixin) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _CustomPropTypes = _interopRequireDefault(_utilsCustomPropTypes);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var Portal = _React['default'].createClass({

    displayName: 'Portal',

    propTypes: {
      /**
       * The DOM Node that the Component will render it's children into
       */
      container: _CustomPropTypes['default'].mountable
    },

    // we use the mixin for now, to avoid duplicating a bunch of code.
    // when the deprecation is removed we need to move the logic here from OverlayMixin
    mixins: [_OverlayMixin.OverlayMixin],

    renderOverlay: function renderOverlay() {
      if (!this.props.children) {
        return null;
      }

      return _React['default'].Children.only(this.props.children);
    },

    render: function render() {
      return null;
    }
  });

  module.exports = Portal;
});