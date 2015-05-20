define(['exports', 'react', './BootstrapMixin', './CollapsibleMixin', 'classnames', './utils/domUtils', './utils/deprecatedProperty', './utils/ValidComponentChildren', './utils/createChainedFunction'], function (exports, _react, _BootstrapMixin, _CollapsibleMixin, _classnames, _utilsDomUtils, _utilsDeprecatedProperty, _utilsValidComponentChildren, _utilsCreateChainedFunction) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _React = _interopRequire(_react);

  var _BootstrapMixin2 = _interopRequire(_BootstrapMixin);

  var _CollapsibleMixin2 = _interopRequire(_CollapsibleMixin);

  var _classNames = _interopRequire(_classnames);

  var _domUtils = _interopRequire(_utilsDomUtils);

  var _collapsable = _interopRequire(_utilsDeprecatedProperty);

  var _ValidComponentChildren = _interopRequire(_utilsValidComponentChildren);

  var _createChainedFunction = _interopRequire(_utilsCreateChainedFunction);

  var specCollapsibleNav = {
    mixins: [_BootstrapMixin2, _CollapsibleMixin2],

    propTypes: {
      onSelect: _React.PropTypes.func,
      activeHref: _React.PropTypes.string,
      activeKey: _React.PropTypes.any,
      collapsable: _collapsable,
      collapsible: _React.PropTypes.bool,
      expanded: _React.PropTypes.bool,
      eventKey: _React.PropTypes.any
    },

    getCollapsibleDOMNode: function getCollapsibleDOMNode() {
      return _React.findDOMNode(this);
    },

    getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
      var height = 0;
      var nodes = this.refs;
      for (var key in nodes) {
        if (nodes.hasOwnProperty(key)) {

          var n = _React.findDOMNode(nodes[key]),
              h = n.offsetHeight,
              computedStyles = _domUtils.getComputedStyles(n);

          height += h + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
        }
      }
      return height;
    },

    render: function render() {
      /*
       * this.props.collapsible is set in NavBar when a eventKey is supplied.
       */
      var collapsible = this.props.collapsible || this.props.collapsable;
      var classes = collapsible ? this.getCollapsibleClassSet() : {};
      /*
       * prevent duplicating navbar-collapse call if passed as prop.
       * kind of overkill...
       * good cadidate to have check implemented as an util that can
       * also be used elsewhere.
       */
      if (this.props.className === undefined || this.props.className.split(' ').indexOf('navbar-collapse') === -2) {
        classes['navbar-collapse'] = collapsible;
      }

      return _React.createElement(
        'div',
        { eventKey: this.props.eventKey, className: (0, _classNames)(this.props.className, classes) },
        _ValidComponentChildren.map(this.props.children, collapsible ? this.renderCollapsibleNavChildren : this.renderChildren)
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
      return (0, _react.cloneElement)(child, {
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        ref: 'nocollapse_' + key,
        key: key,
        navItem: true
      });
    },

    renderCollapsibleNavChildren: function renderCollapsibleNavChildren(child, index) {
      var key = child.key ? child.key : index;
      return (0, _react.cloneElement)(child, {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: (0, _createChainedFunction)(child.props.onSelect, this.props.onSelect),
        ref: 'collapsible_' + key,
        key: key,
        navItem: true
      });
    }
  };

  var CollapsibleNav = _React.createClass(specCollapsibleNav);

  exports.specCollapsibleNav = specCollapsibleNav;
  exports['default'] = CollapsibleNav;
});