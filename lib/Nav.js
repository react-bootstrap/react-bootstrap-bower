define(["exports", "module", "react", "./BootstrapMixin", "./CollapsableMixin", "classnames", "./utils/domUtils", "./utils/ValidComponentChildren", "./utils/createChainedFunction"], function (exports, module, _react, _BootstrapMixin, _CollapsableMixin, _classnames, _utilsDomUtils, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var CollapsableMixin = _interopRequire(_CollapsableMixin);

  var classNames = _interopRequire(_classnames);

  var domUtils = _interopRequire(_utilsDomUtils);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var createChainedFunction = _interopRequire(_utilsCreateChainedFunction);

  var Nav = React.createClass({
    displayName: "Nav",

    mixins: [BootstrapMixin, CollapsableMixin],

    propTypes: {
      activeHref: React.PropTypes.string,
      activeKey: React.PropTypes.any,
      bsStyle: React.PropTypes.oneOf(["tabs", "pills"]),
      stacked: React.PropTypes.bool,
      justified: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      collapsable: React.PropTypes.bool,
      expanded: React.PropTypes.bool,
      navbar: React.PropTypes.bool,
      eventKey: React.PropTypes.any,
      pullRight: React.PropTypes.bool,
      right: React.PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "nav"
      };
    },

    getCollapsableDOMNode: function getCollapsableDOMNode() {
      return React.findDOMNode(this);
    },

    getCollapsableDimensionValue: function getCollapsableDimensionValue() {
      var node = React.findDOMNode(this.refs.ul),
          height = node.offsetHeight,
          computedStyles = domUtils.getComputedStyles(node);

      return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
    },

    render: function render() {
      var classes = this.props.collapsable ? this.getCollapsableClassSet() : {};

      classes["navbar-collapse"] = this.props.collapsable;

      if (this.props.navbar && !this.props.collapsable) {
        return this.renderUl();
      }

      return React.createElement(
        "nav",
        _extends({}, this.props, { className: classNames(this.props.className, classes) }),
        this.renderUl()
      );
    },

    renderUl: function renderUl() {
      var classes = this.getBsClassSet();

      classes["nav-stacked"] = this.props.stacked;
      classes["nav-justified"] = this.props.justified;
      classes["navbar-nav"] = this.props.navbar;
      classes["pull-right"] = this.props.pullRight;
      classes["navbar-right"] = this.props.right;

      return React.createElement(
        "ul",
        _extends({}, this.props, { className: classNames(this.props.className, classes), ref: "ul" }),
        ValidComponentChildren.map(this.props.children, this.renderNavItem)
      );
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

    renderNavItem: function renderNavItem(child, index) {
      return cloneElement(child, {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index,
        navItem: true
      });
    }
  });

  module.exports = Nav;
});