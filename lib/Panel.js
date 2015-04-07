define(["exports", "module", "react", "classnames", "./BootstrapMixin", "./CollapsableMixin"], function (exports, module, _react, _classnames, _BootstrapMixin, _CollapsableMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var cloneElement = _react.cloneElement;

  var classSet = _interopRequire(_classnames);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var CollapsableMixin = _interopRequire(_CollapsableMixin);

  var Panel = React.createClass({
    displayName: "Panel",

    mixins: [BootstrapMixin, CollapsableMixin],

    propTypes: {
      collapsable: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      header: React.PropTypes.node,
      id: React.PropTypes.string,
      footer: React.PropTypes.node,
      eventKey: React.PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "panel",
        bsStyle: "default"
      };
    },

    handleSelect: function handleSelect(e) {
      e.selected = true;

      if (this.props.onSelect) {
        this.props.onSelect(e, this.props.eventKey);
      } else {
        e.preventDefault();
      }

      if (e.selected) {
        this.handleToggle();
      }
    },

    handleToggle: function handleToggle() {
      this.setState({ expanded: !this.state.expanded });
    },

    getCollapsableDimensionValue: function getCollapsableDimensionValue() {
      return React.findDOMNode(this.refs.panel).scrollHeight;
    },

    getCollapsableDOMNode: function getCollapsableDOMNode() {
      if (!this.isMounted() || !this.refs || !this.refs.panel) {
        return null;
      }

      return React.findDOMNode(this.refs.panel);
    },

    render: function render() {
      var classes = this.getBsClassSet();

      return React.createElement(
        "div",
        _extends({}, this.props, {
          className: classSet(this.props.className, classes),
          id: this.props.collapsable ? null : this.props.id, onSelect: null }),
        this.renderHeading(),
        this.props.collapsable ? this.renderCollapsableBody() : this.renderBody(),
        this.renderFooter()
      );
    },

    renderCollapsableBody: function renderCollapsableBody() {
      var collapseClass = this.prefixClass("collapse");

      return React.createElement(
        "div",
        {
          className: classSet(this.getCollapsableClassSet(collapseClass)),
          id: this.props.id,
          ref: "panel",
          "aria-expanded": this.isExpanded() ? "true" : "false" },
        this.renderBody()
      );
    },

    renderBody: function renderBody() {
      var allChildren = this.props.children;
      var bodyElements = [];
      var panelBodyChildren = [];
      var bodyClass = this.prefixClass("body");

      function getProps() {
        return { key: bodyElements.length };
      }

      function addPanelChild(child) {
        bodyElements.push(cloneElement(child, getProps()));
      }

      function addPanelBody(children) {
        bodyElements.push(React.createElement(
          "div",
          _extends({ className: bodyClass }, getProps()),
          children
        ));
      }

      function maybeRenderPanelBody() {
        if (panelBodyChildren.length === 0) {
          return;
        }

        addPanelBody(panelBodyChildren);
        panelBodyChildren = [];
      }

      // Handle edge cases where we should not iterate through children.
      if (!Array.isArray(allChildren) || allChildren.length === 0) {
        if (this.shouldRenderFill(allChildren)) {
          addPanelChild(allChildren);
        } else {
          addPanelBody(allChildren);
        }
      } else {

        allChildren.forEach((function (child) {
          if (this.shouldRenderFill(child)) {
            maybeRenderPanelBody();

            // Separately add the filled element.
            addPanelChild(child);
          } else {
            panelBodyChildren.push(child);
          }
        }).bind(this));

        maybeRenderPanelBody();
      }

      return bodyElements;
    },

    shouldRenderFill: function shouldRenderFill(child) {
      return React.isValidElement(child) && child.props.fill != null;
    },

    renderHeading: function renderHeading() {
      var header = this.props.header;

      if (!header) {
        return null;
      }

      if (!React.isValidElement(header) || Array.isArray(header)) {
        header = this.props.collapsable ? this.renderCollapsableTitle(header) : header;
      } else if (this.props.collapsable) {

        header = cloneElement(header, {
          className: classSet(this.prefixClass("title")),
          children: this.renderAnchor(header.props.children)
        });
      } else {

        header = cloneElement(header, {
          className: classSet(this.prefixClass("title"))
        });
      }

      return React.createElement(
        "div",
        { className: this.prefixClass("heading") },
        header
      );
    },

    renderAnchor: function renderAnchor(header) {
      return React.createElement(
        "a",
        {
          href: "#" + (this.props.id || ""),
          className: this.isExpanded() ? null : "collapsed",
          "aria-expanded": this.isExpanded() ? "true" : "false",
          onClick: this.handleSelect },
        header
      );
    },

    renderCollapsableTitle: function renderCollapsableTitle(header) {
      return React.createElement(
        "h4",
        { className: this.prefixClass("title") },
        this.renderAnchor(header)
      );
    },

    renderFooter: function renderFooter() {
      if (!this.props.footer) {
        return null;
      }

      return React.createElement(
        "div",
        { className: this.prefixClass("footer") },
        this.props.footer
      );
    }
  });

  module.exports = Panel;
});