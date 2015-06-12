define(['exports', 'module', 'react', 'classnames', './BootstrapMixin', './PaginationButton'], function (exports, module, _react, _classnames, _BootstrapMixin, _PaginationButton) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _classNames = _interopRequireDefault(_classnames);

  var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

  var _PaginationButton2 = _interopRequireDefault(_PaginationButton);

  console.warn('This file is deprecated, and will be removed in v0.24.0. Use react-bootstrap.js or react-bootstrap.min.js instead.');
  console.warn('You can read more about it at https://github.com/react-bootstrap/react-bootstrap/issues/693');

  var Pagination = _React['default'].createClass({
    displayName: 'Pagination',

    mixins: [_BootstrapMixin2['default']],

    propTypes: {
      activePage: _React['default'].PropTypes.number,
      items: _React['default'].PropTypes.number,
      maxButtons: _React['default'].PropTypes.number,
      ellipsis: _React['default'].PropTypes.bool,
      first: _React['default'].PropTypes.bool,
      last: _React['default'].PropTypes.bool,
      prev: _React['default'].PropTypes.bool,
      next: _React['default'].PropTypes.bool,
      onSelect: _React['default'].PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        activePage: 1,
        items: 1,
        maxButtons: 0,
        first: false,
        last: false,
        prev: false,
        next: false,
        ellipsis: true,
        bsClass: 'pagination'
      };
    },

    renderPageButtons: function renderPageButtons() {
      var pageButtons = [];
      var startPage = undefined,
          endPage = undefined,
          hasHiddenPagesAfter = undefined;
      var _props = this.props;
      var maxButtons = _props.maxButtons;
      var activePage = _props.activePage;
      var items = _props.items;
      var onSelect = _props.onSelect;
      var ellipsis = _props.ellipsis;

      if (maxButtons) {
        var hiddenPagesBefore = activePage - parseInt(maxButtons / 2);
        startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
        hasHiddenPagesAfter = startPage + maxButtons <= items;

        if (!hasHiddenPagesAfter) {
          endPage = items;
          startPage = items - maxButtons + 1;
        } else {
          endPage = startPage + maxButtons - 1;
        }
      } else {
        startPage = 1;
        endPage = items;
      }

      for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
        pageButtons.push(_React['default'].createElement(
          _PaginationButton2['default'],
          {
            key: pagenumber,
            eventKey: pagenumber,
            active: pagenumber === activePage,
            onSelect: onSelect },
          pagenumber
        ));
      }

      if (maxButtons && hasHiddenPagesAfter && ellipsis) {
        pageButtons.push(_React['default'].createElement(
          _PaginationButton2['default'],
          {
            key: 'ellipsis',
            disabled: true },
          _React['default'].createElement(
            'span',
            { 'aria-label': 'More' },
            '...'
          )
        ));
      }

      return pageButtons;
    },

    renderPrev: function renderPrev() {
      if (!this.props.prev) {
        return null;
      }

      return _React['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'prev',
          eventKey: this.props.activePage - 1,
          disabled: this.props.activePage === 1,
          onSelect: this.props.onSelect },
        _React['default'].createElement(
          'span',
          { 'aria-label': 'Previous' },
          '‹'
        )
      );
    },

    renderNext: function renderNext() {
      if (!this.props.next) {
        return null;
      }

      return _React['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'next',
          eventKey: this.props.activePage + 1,
          disabled: this.props.activePage === this.props.items,
          onSelect: this.props.onSelect },
        _React['default'].createElement(
          'span',
          { 'aria-label': 'Next' },
          '›'
        )
      );
    },

    renderFirst: function renderFirst() {
      if (!this.props.first) {
        return null;
      }

      return _React['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'first',
          eventKey: 1,
          disabled: this.props.activePage === 1,
          onSelect: this.props.onSelect },
        _React['default'].createElement(
          'span',
          { 'aria-label': 'First' },
          '«'
        )
      );
    },

    renderLast: function renderLast() {
      if (!this.props.last) {
        return null;
      }

      return _React['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'last',
          eventKey: this.props.items,
          disabled: this.props.activePage === this.props.items,
          onSelect: this.props.onSelect },
        _React['default'].createElement(
          'span',
          { 'aria-label': 'Last' },
          '»'
        )
      );
    },

    render: function render() {
      return _React['default'].createElement(
        'ul',
        _extends({}, this.props, {
          className: (0, _classNames['default'])(this.props.className, this.getBsClassSet()) }),
        this.renderFirst(),
        this.renderPrev(),
        this.renderPageButtons(),
        this.renderNext(),
        this.renderLast()
      );
    }
  });

  module.exports = Pagination;
});