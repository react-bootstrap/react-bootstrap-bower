define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './utils/CustomPropTypes'], function (exports, module, _react, _classnames, _BootstrapMixin, _utilsCustomPropTypes) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _CustomPropTypes = _interopRequireDefault(_utilsCustomPropTypes);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var ButtonGroup = _React['default'].createClass({
    displayName: 'ButtonGroup',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      vertical: _React['default'].PropTypes.bool,
      justified: _React['default'].PropTypes.bool,
      block: _CustomPropTypes['default'].all([_React['default'].PropTypes.bool, function (props, propName, componentName) {
        if (props.block && !props.vertical) {
          return new Error('The block property requires the vertical property to be set to have any effect');
        }
      }])
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'button-group'
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();
      classes['btn-group'] = !this.props.vertical;
      classes['btn-group-vertical'] = this.props.vertical;
      classes['btn-group-justified'] = this.props.justified;
      classes['btn-block'] = this.props.block;

      return _React['default'].createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = ButtonGroup;
});