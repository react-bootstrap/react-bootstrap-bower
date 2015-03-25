define(["exports", "module", "react", "react/lib/ReactTransitionEvents"], function (exports, module, _react, _reactLibReactTransitionEvents) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  var TransitionEvents = _interopRequire(_reactLibReactTransitionEvents);

  var CollapsableMixin = {

    propTypes: {
      defaultExpanded: React.PropTypes.bool,
      expanded: React.PropTypes.bool
    },

    getInitialState: function getInitialState() {
      var defaultExpanded = this.props.defaultExpanded != null ? this.props.defaultExpanded : this.props.expanded != null ? this.props.expanded : false;

      return {
        expanded: defaultExpanded,
        collapsing: false
      };
    },

    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
      var willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;
      if (willExpanded === this.isExpanded()) {
        return;
      }

      // if the expanded state is being toggled, ensure node has a dimension value
      // this is needed for the animation to work and needs to be set before
      // the collapsing class is applied (after collapsing is applied the in class
      // is removed and the node's dimension will be wrong)

      var node = this.getCollapsableDOMNode();
      var dimension = this.dimension();
      var value = "0";

      if (!willExpanded) {
        value = this.getCollapsableDimensionValue();
      }

      node.style[dimension] = value + "px";

      this._afterWillUpdate();
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
      // check if expanded is being toggled; if so, set collapsing
      this._checkToggleCollapsing(prevProps, prevState);

      // check if collapsing was turned on; if so, start animation
      this._checkStartAnimation();
    },

    // helps enable test stubs
    _afterWillUpdate: function _afterWillUpdate() {},

    _checkStartAnimation: function _checkStartAnimation() {
      if (!this.state.collapsing) {
        return;
      }

      var node = this.getCollapsableDOMNode();
      var dimension = this.dimension();
      var value = this.getCollapsableDimensionValue();

      // setting the dimension here starts the transition animation
      var result = undefined;
      if (this.isExpanded()) {
        result = value + "px";
      } else {
        result = "0px";
      }
      node.style[dimension] = result;
    },

    _checkToggleCollapsing: function _checkToggleCollapsing(prevProps, prevState) {
      var wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
      var isExpanded = this.isExpanded();
      if (wasExpanded !== isExpanded) {
        if (wasExpanded) {
          this._handleCollapse();
        } else {
          this._handleExpand();
        }
      }
    },

    _handleExpand: function _handleExpand() {
      var _this = this;

      var node = this.getCollapsableDOMNode();
      var dimension = this.dimension();

      var complete = function () {
        _this._removeEndEventListener(node, complete);
        // remove dimension value - this ensures the collapsable item can grow
        // in dimension after initial display (such as an image loading)
        node.style[dimension] = "";
        _this.setState({
          collapsing: false
        });
      };

      this._addEndEventListener(node, complete);

      this.setState({
        collapsing: true
      });
    },

    _handleCollapse: function _handleCollapse() {
      var _this = this;

      var node = this.getCollapsableDOMNode();

      var complete = function () {
        _this._removeEndEventListener(node, complete);
        _this.setState({
          collapsing: false
        });
      };

      this._addEndEventListener(node, complete);

      this.setState({
        collapsing: true
      });
    },

    // helps enable test stubs
    _addEndEventListener: function _addEndEventListener(node, complete) {
      TransitionEvents.addEndEventListener(node, complete);
    },

    // helps enable test stubs
    _removeEndEventListener: function _removeEndEventListener(node, complete) {
      TransitionEvents.removeEndEventListener(node, complete);
    },

    dimension: function dimension() {
      return typeof this.getCollapsableDimension === "function" ? this.getCollapsableDimension() : "height";
    },

    isExpanded: function isExpanded() {
      return this.props.expanded != null ? this.props.expanded : this.state.expanded;
    },

    getCollapsableClassSet: function getCollapsableClassSet(className) {
      var classes = {};

      if (typeof className === "string") {
        className.split(" ").forEach(function (subClasses) {
          if (subClasses) {
            classes[subClasses] = true;
          }
        });
      }

      classes.collapsing = this.state.collapsing;
      classes.collapse = !this.state.collapsing;
      classes["in"] = this.isExpanded() && !this.state.collapsing;

      return classes;
    }
  };

  module.exports = CollapsableMixin;
});