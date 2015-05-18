define(['exports', 'module', 'react', 'classnames', './BootstrapMixin'], function (exports, module, _react, _classnames, _BootstrapMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _classNames = _interopRequire(_classnames);

  var _BootstrapMixin2 = _interopRequire(_BootstrapMixin);

  var ButtonGroup = _React.createClass({
    displayName: 'ButtonGroup',

    mixins: [_BootstrapMixin2],

    propTypes: {
      vertical: _React.PropTypes.bool,
      justified: _React.PropTypes.bool
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

      return _React.createElement(
        'div',
        _extends({}, this.props, {
          className: (0, _classNames)(this.props.className, classes) }),
        this.props.children
      );
    }
  });

  module.exports = ButtonGroup;
});