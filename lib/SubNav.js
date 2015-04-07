define(["exports", "module", "react", "classnames", "./utils/ValidComponentChildren", "./utils/createChainedFunction", "./BootstrapMixin"], function (exports, module, _react, _classnames, _utilsValidComponentChildren, _utilsCreateChainedFunction, _BootstrapMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var classSet = _interopRequire(_classnames);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var createChainedFunction = _interopRequire(_utilsCreateChainedFunction);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var SubNav = React.createClass({
    displayName: "SubNav",

    mixins: [BootstrapMixin],

    propTypes: {
      onSelect: React.PropTypes.func,
      active: React.PropTypes.bool,
      activeHref: React.PropTypes.string,
      activeKey: React.PropTypes.any,
      disabled: React.PropTypes.bool,
      href: React.PropTypes.string,
      title: React.PropTypes.string,
      text: React.PropTypes.node,
      target: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "nav"
      };
    },

    handleClick: function handleClick(e) {
      if (this.props.onSelect) {
        e.preventDefault();

        if (!this.props.disabled) {
          this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
        }
      }
    },

    isActive: function isActive() {
      return this.isChildActive(this);
    },

    isChildActive: function isChildActive(child) {
      var _this = this;

      if (child.props.active) {
        return true;
      }

      if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
        return true;
      }

      if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
        return true;
      }

      if (child.props.children) {
        var _ret = (function () {
          var isActive = false;

          ValidComponentChildren.forEach(child.props.children, function (grandchild) {
            if (this.isChildActive(grandchild)) {
              isActive = true;
            }
          }, _this);

          return {
            v: isActive
          };
        })();

        if (typeof _ret === "object") {
          return _ret.v;
        }
      }

      return false;
    },

    getChildActiveProp: function getChildActiveProp(child) {
      if (child.props.active) {
        return true;
      }
      if (this.props.activeKey != null) {
        if (child.props.eventKey === this.props.activeKey) {
          return true;
        }
      }
      if (this.props.activeHref != null) {
        if (child.props.href === this.props.activeHref) {
          return true;
        }
      }

      return child.props.active;
    },

    render: function render() {
      var classes = {
        active: this.isActive(),
        disabled: this.props.disabled
      };

      return React.createElement(
        "li",
        _extends({}, this.props, { className: classSet(this.props.className, classes) }),
        React.createElement(
          "a",
          {
            href: this.props.href,
            title: this.props.title,
            target: this.props.target,
            onClick: this.handleClick,
            ref: "anchor" },
          this.props.text
        ),
        React.createElement(
          "ul",
          { className: "nav" },
          ValidComponentChildren.map(this.props.children, this.renderNavItem)
        )
      );
    },

    renderNavItem: function renderNavItem(child, index) {
      return cloneElement(child, {
        active: this.getChildActiveProp(child),
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index
      });
    }
  });

  module.exports = SubNav;
});