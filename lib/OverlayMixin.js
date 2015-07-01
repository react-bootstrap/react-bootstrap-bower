define(['exports', 'react', './utils/CustomPropTypes', './utils/domUtils', './utils/deprecationWarning'], function (exports, _react, _utilsCustomPropTypes, _utilsDomUtils, _utilsDeprecationWarning) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /*eslint-disable react/prop-types */

  var _React = _interopRequireDefault(_react);

  var _CustomPropTypes = _interopRequireDefault(_utilsCustomPropTypes);

  var _domUtils = _interopRequireDefault(_utilsDomUtils);

  var _deprecationWarning = _interopRequireDefault(_utilsDeprecationWarning);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');var OverlayMixin = {
    propTypes: {

      container: _CustomPropTypes['default'].mountable
    },

    componentDidMount: function componentDidMount() {
      this._renderOverlay();
    },

    componentDidUpdate: function componentDidUpdate() {
      this._renderOverlay();
    },

    componentWillUnmount: function componentWillUnmount() {
      this._unrenderOverlay();
      this._mountOverlayTarget();
    },

    _mountOverlayTarget: function _mountOverlayTarget() {
      if (!this._overlayTarget) {
        this._overlayTarget = document.createElement('div');
        this.getContainerDOMNode().appendChild(this._overlayTarget);
      }
    },

    _unmountOverlayTarget: function _unmountOverlayTarget() {
      if (this._overlayTarget) {
        this.getContainerDOMNode().removeChild(this._overlayTarget);
        this._overlayTarget = null;
      }
    },

    _renderOverlay: function _renderOverlay() {

      var overlay = this.renderOverlay();

      // Save reference to help testing
      if (overlay !== null) {
        this._mountOverlayTarget();
        this._overlayInstance = _React['default'].render(overlay, this._overlayTarget);
      } else {
        // Unrender if the component is null for transitions to null
        this._unrenderOverlay();
        this._unmountOverlayTarget();
      }
    },

    _unrenderOverlay: function _unrenderOverlay() {
      if (this._overlayTarget) {
        _React['default'].unmountComponentAtNode(this._overlayTarget);
        this._overlayInstance = null;
      }
    },

    getOverlayDOMNode: function getOverlayDOMNode() {
      if (!this.isMounted()) {
        throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
      }

      if (this._overlayInstance) {
        return _React['default'].findDOMNode(this._overlayInstance);
      }

      return null;
    },

    getContainerDOMNode: function getContainerDOMNode() {
      return _React['default'].findDOMNode(this.props.container) || _domUtils['default'].ownerDocument(this).body;
    }
  };

  exports.OverlayMixin = OverlayMixin;
  exports['default'] = _extends({}, OverlayMixin, {

    componentWillMount: function componentWillMount() {
      (0, _deprecationWarning['default'])('Overlay mixin', 'the `<Portal/>` Component', 'http://react-bootstrap.github.io/components.html#utilities-portal');
    }
  });
});