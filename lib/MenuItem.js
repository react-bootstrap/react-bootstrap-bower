define(['exports', 'module', 'react', 'classnames'], function (exports, module, _react, _classnames) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _classNames = _interopRequire(_classnames);

  var MenuItem = _React.createClass({
    displayName: 'MenuItem',

    propTypes: {
      header: _React.PropTypes.bool,
      divider: _React.PropTypes.bool,
      href: _React.PropTypes.string,
      title: _React.PropTypes.string,
      target: _React.PropTypes.string,
      onSelect: _React.PropTypes.func,
      eventKey: _React.PropTypes.any,
      active: _React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        href: '#',
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
      return _React.createElement(
        'a',
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

      return _React.createElement(
        'li',
        _extends({}, this.props, { role: 'presentation', title: null, href: null,
          className: (0, _classNames)(this.props.className, classes) }),
        children
      );
    }
  });

  module.exports = MenuItem;
});