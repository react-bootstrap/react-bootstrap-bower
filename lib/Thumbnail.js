define(['exports', 'module', 'react', 'classnames', './BootstrapMixin'], function (exports, module, _react, _classnames, _BootstrapMixin) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _classSet = _interopRequire(_classnames);

  var _BootstrapMixin2 = _interopRequire(_BootstrapMixin);

  var Thumbnail = _React.createClass({
    displayName: 'Thumbnail',

    mixins: [_BootstrapMixin2],

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: 'thumbnail'
      };
    },

    render: function render() {
      var classes = this.getBsClassSet();

      if (this.props.href) {
        return _React.createElement(
          'a',
          _extends({}, this.props, { href: this.props.href, className: (0, _classSet)(this.props.className, classes) }),
          _React.createElement('img', { src: this.props.src, alt: this.props.alt })
        );
      } else {
        if (this.props.children) {
          return _React.createElement(
            'div',
            _extends({}, this.props, { className: (0, _classSet)(this.props.className, classes) }),
            _React.createElement('img', { src: this.props.src, alt: this.props.alt }),
            _React.createElement(
              'div',
              { className: 'caption' },
              this.props.children
            )
          );
        } else {
          return _React.createElement(
            'div',
            _extends({}, this.props, { className: (0, _classSet)(this.props.className, classes) }),
            _React.createElement('img', { src: this.props.src, alt: this.props.alt })
          );
        }
      }
    }
  });

  module.exports = Thumbnail;
});