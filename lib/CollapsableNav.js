define(["exports", "module", "react", "./BootstrapMixin", "./CollapsableMixin", "classnames", "./utils/domUtils", "./utils/ValidComponentChildren", "./utils/createChainedFunction"], function (exports, module, _react, _BootstrapMixin, _CollapsableMixin, _classnames, _utilsDomUtils, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var CollapsableMixin = _interopRequire(_CollapsableMixin);

  var classNames = _interopRequire(_classnames);

  var domUtils = _interopRequire(_utilsDomUtils);

  var ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var createChainedFunction = _interopRequire(_utilsCreateChainedFunction);

  var CollapsableNav = React.createClass({
    displayName: "CollapsableNav",

    mixins: [BootstrapMixin, CollapsableMixin],

    propTypes: {
      onSelect: React.PropTypes.func,
      activeHref: React.PropTypes.string,
      activeKey: React.PropTypes.any,
      collapsable: React.PropTypes.bool,
      expanded: React.PropTypes.bool,
      eventKey: React.PropTypes.any
    },

    getCollapsableDOMNode: function getCollapsableDOMNode() {
      return this.getDOMNode();
    },

    getCollapsableDimensionValue: function getCollapsableDimensionValue() {
      var height = 0;
      var nodes = this.refs;
      for (var key in nodes) {
        if (nodes.hasOwnProperty(key)) {

          var n = nodes[key].getDOMNode(),
              h = n.offsetHeight,
              computedStyles = domUtils.getComputedStyles(n);

          height += h + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
        }
      }
      return height;
    },

    render: function render() {
      /*
       * this.props.collapsable is set in NavBar when a eventKey is supplied.
       */
      var classes = this.props.collapsable ? this.getCollapsableClassSet() : {};
      /*
       * prevent duplicating navbar-collapse call if passed as prop. kind of overkill... good cadidate to have check implemented as a util that can
       * also be used elsewhere.
       */
      if (this.props.className === undefined || this.props.className.split(" ").indexOf("navbar-collapse") === -2) {
        classes["navbar-collapse"] = this.props.collapsable;
      }

      return React.createElement(
        "div",
        { eventKey: this.props.eventKey, className: classNames(this.props.className, classes) },
        ValidComponentChildren.map(this.props.children, this.props.collapsable ? this.renderCollapsableNavChildren : this.renderChildren)
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

    renderChildren: function renderChildren(child, index) {
      var key = child.key ? child.key : index;
      return cloneElement(child, {
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        ref: "nocollapse_" + key,
        key: key,
        navItem: true
      });
    },

    renderCollapsableNavChildren: function renderCollapsableNavChildren(child, index) {
      var key = child.key ? child.key : index;
      return cloneElement(child, {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: "collapsable_" + key,
        key: key,
        navItem: true
      });
    }
  });

  module.exports = CollapsableNav;
});