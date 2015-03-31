define(["exports", "module", "react", "classnames"], function (exports, module, _react, _classnames) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var React = _interopRequire(_react);

  var classSet = _interopRequire(_classnames);

  var FormGroup = (function (_React$Component) {
    function FormGroup() {
      _classCallCheck(this, FormGroup);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    }

    _inherits(FormGroup, _React$Component);

    _createClass(FormGroup, {
      render: {
        value: function render() {
          var classes = {
            "form-group": !this.props.standalone,
            "has-feedback": this.props.hasFeedback,
            "has-success": this.props.bsStyle === "success",
            "has-warning": this.props.bsStyle === "warning",
            "has-error": this.props.bsStyle === "error"
          };

          return React.createElement(
            "div",
            { className: classSet(classes, this.props.groupClassName) },
            this.props.children
          );
        }
      }
    });

    return FormGroup;
  })(React.Component);

  FormGroup.defaultProps = {
    standalone: false
  };

  FormGroup.propTypes = {
    standalone: React.PropTypes.bool,
    hasFeedback: React.PropTypes.bool,
    bsStyle: React.PropTypes.oneOf(["success", "warning", "error"]),
    groupClassName: React.PropTypes.string
  };

  module.exports = FormGroup;
});