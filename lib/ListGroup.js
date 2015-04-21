define(["exports", "module", "react", "classnames", "./utils/ValidComponentChildren"], function (exports, module, _react, _classnames, _utilsValidComponentChildren) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var classNames = _interopRequire(_classnames);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var ListGroup = (function (_React$Component) {
    function ListGroup() {
      _classCallCheck(this, ListGroup);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    }

    _inherits(ListGroup, _React$Component);

    _createClass(ListGroup, {
      render: {
        value: function render() {
          var items = ValidComponentChildren.map(this.props.children, function (item, index) {
            return cloneElement(item, { key: item.key ? item.key : index });
          });

          var childrenAnchors = false;

          if (!this.props.children) {
            return this.renderDiv(items);
          } else if (React.Children.count(this.props.children) === 1) {
            var child = this.props.children;

            childrenAnchors = child.props.href ? true : false;
          } else {

            childrenAnchors = Array.prototype.some.call(this.props.children, function (child) {
              return child.props.href;
            });
          }

          if (childrenAnchors) {
            return this.renderDiv(items);
          } else {
            return this.renderUL(items);
          }
        }
      },
      renderUL: {
        value: function renderUL(items) {
          var listItems = ValidComponentChildren.map(items, function (item, index) {
            return cloneElement(item, { listItem: true });
          });

          return React.createElement(
            "ul",
            { className: classNames(this.props.className, "list-group") },
            listItems
          );
        }
      },
      renderDiv: {
        value: function renderDiv(items) {
          return React.createElement(
            "div",
            { className: classNames(this.props.className, "list-group") },
            items
          );
        }
      }
    });

    return ListGroup;
  })(React.Component);

  ListGroup.propTypes = {
    className: React.PropTypes.string
  };

  module.exports = ListGroup;
});