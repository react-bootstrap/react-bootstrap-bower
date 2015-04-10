define(["exports", "module", "react", "classnames", "./utils/TransitionEvents"], function (exports, module, _react, _classnames, _utilsTransitionEvents) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var classNames = _interopRequire(_classnames);

  var TransitionEvents = _interopRequire(_utilsTransitionEvents);

  var CarouselItem = React.createClass({
    displayName: "CarouselItem",

    propTypes: {
      direction: React.PropTypes.oneOf(["prev", "next"]),
      onAnimateOutEnd: React.PropTypes.func,
      active: React.PropTypes.bool,
      animateIn: React.PropTypes.bool,
      animateOut: React.PropTypes.bool,
      caption: React.PropTypes.node,
      index: React.PropTypes.number
    },

    getInitialState: function getInitialState() {
      return {
        direction: null
      };
    },

    getDefaultProps: function getDefaultProps() {
      return {
        animation: true
      };
    },

    handleAnimateOutEnd: function handleAnimateOutEnd() {
      if (this.props.onAnimateOutEnd && this.isMounted()) {
        this.props.onAnimateOutEnd(this.props.index);
      }
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (this.props.active !== nextProps.active) {
        this.setState({
          direction: null
        });
      }
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
      if (!this.props.active && prevProps.active) {
        TransitionEvents.addEndEventListener(React.findDOMNode(this), this.handleAnimateOutEnd);
      }

      if (this.props.active !== prevProps.active) {
        setTimeout(this.startAnimation, 20);
      }
    },

    startAnimation: function startAnimation() {
      if (!this.isMounted()) {
        return;
      }

      this.setState({
        direction: this.props.direction === "prev" ? "right" : "left"
      });
    },

    render: function render() {
      var classes = {
        item: true,
        active: this.props.active && !this.props.animateIn || this.props.animateOut,
        next: this.props.active && this.props.animateIn && this.props.direction === "next",
        prev: this.props.active && this.props.animateIn && this.props.direction === "prev"
      };

      if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
        classes[this.state.direction] = true;
      }

      return React.createElement(
        "div",
        _extends({}, this.props, { className: classNames(this.props.className, classes) }),
        this.props.children,
        this.props.caption ? this.renderCaption() : null
      );
    },

    renderCaption: function renderCaption() {
      return React.createElement(
        "div",
        { className: "carousel-caption" },
        this.props.caption
      );
    }
  });

  module.exports = CarouselItem;
});