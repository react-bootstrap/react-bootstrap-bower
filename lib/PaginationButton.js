define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './utils/createSelectedEvent'], function (exports, module, _react, _classnames, _BootstrapMixin, _utilsCreateSelectedEvent) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _createSelectedEvent = _interopRequireDefault(_utilsCreateSelectedEvent);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var PaginationButton = _React['default'].createClass({
    displayName: 'PaginationButton',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      className: _React['default'].PropTypes.string,
      eventKey: _React['default'].PropTypes.oneOfType([_React['default'].PropTypes.string, _React['default'].PropTypes.number]),
      onSelect: _React['default'].PropTypes.func,
      disabled: _React['default'].PropTypes.bool,
      active: _React['default'].PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        active: false,
        disabled: false
      };
    },

    handleClick: function handleClick(event) {
      // This would go away once SafeAnchor is available
      event.preventDefault();

      if (this.props.onSelect) {
        var selectedEvent = (0, _createSelectedEvent['default'])(this.props.eventKey);
        this.props.onSelect(event, selectedEvent);
      }
    },

    render: function render() {
      var classes = this.getBsClassSet();

      classes.active = this.props.active;
      classes.disabled = this.props.disabled;

      return _React['default'].createElement(
        'li',
        { className: (0, _classNames['default'])(this.props.className, classes) },
        _React['default'].createElement(
          'a',
          { href: '#', onClick: this.handleClick },
          this.props.children
        )
      );
    }
  });

  module.exports = PaginationButton;
});