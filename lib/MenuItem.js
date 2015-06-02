define(['exports', 'module', 'react', 'classnames', './SafeAnchor'], function (exports, module, _react, _classnames, _SafeAnchor) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

  var MenuItem = _React['default'].createClass({
    displayName: 'MenuItem',

    propTypes: {
      header: _React['default'].PropTypes.bool,
      divider: _React['default'].PropTypes.bool,
      href: _React['default'].PropTypes.string,
      title: _React['default'].PropTypes.string,
      target: _React['default'].PropTypes.string,
      onSelect: _React['default'].PropTypes.func,
      eventKey: _React['default'].PropTypes.any,
      active: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        active: false
      };
    },

    handleClick: function handleClick(e) {
      if (this.props.onSelect) {
        e.preventDefault();
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    },

    renderAnchor: function renderAnchor() {
      return _React['default'].createElement(
        _SafeAnchor2['default'],
        { onClick: this.handleClick, href: this.props.href, target: this.props.target, title: this.props.title, tabIndex: '-1' },
        this.props.children
      );
    },

    render: function render() {
      var classes = {
        'dropdown-header': this.props.header,
        'divider': this.props.divider,
        'active': this.props.active
      };

      var children = null;
      if (this.props.header) {
        children = this.props.children;
      } else if (!this.props.divider) {
        children = this.renderAnchor();
      }

      return _React['default'].createElement(
        'li',
        _extends({}, this.props, { role: 'presentation', title: null, href: null,
          className: (0, _classNames['default'])(this.props.className, classes) }),
        children
      );
    }
  });

  module.exports = MenuItem;
});