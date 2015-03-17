define(function (require, exports, module) {var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');

var BootstrapMixin = require('./BootstrapMixin');
var CollapsableMixin = require('./CollapsableMixin');

var Panel = React.createClass({displayName: "Panel",
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    collapsable: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    eventKey: React.PropTypes.any
  },

  getDefaultProps: function () {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  handleSelect: function(e){
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

  handleToggle: function(){
    this.setState({expanded:!this.state.expanded});
  },

  getCollapsableDimensionValue: function () {
    return this.refs.panel.getDOMNode().scrollHeight;
  },

  getCollapsableDOMNode: function () {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel.getDOMNode();
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      React.createElement("div", React.__spread({},  this.props, 
        {className: joinClasses(this.props.className, classSet(classes)), 
        id: this.props.collapsable ? null : this.props.id, onSelect: null}), 
        this.renderHeading(), 
        this.props.collapsable ? this.renderCollapsableBody() : this.renderBody(), 
        this.renderFooter()
      )
    );
  },

  renderCollapsableBody: function () {
    var collapseClass = this.prefixClass('collapse');

    return (
      React.createElement("div", {
        className: classSet(this.getCollapsableClassSet(collapseClass)), 
        id: this.props.id, 
        ref: "panel", 
        "aria-expanded": this.isExpanded() ? 'true' : 'false'}, 
        this.renderBody()
      )
    );
  },

  renderBody: function () {
    var allChildren = this.props.children;
    var bodyElements = [];
    var panelBodyChildren = [];
    var bodyClass = this.prefixClass('body');

    function getProps() {
      return {key: bodyElements.length};
    }

    function addPanelChild (child) {
      bodyElements.push(cloneWithProps(child, getProps()));
    }

    function addPanelBody (children) {
      bodyElements.push(
        React.createElement("div", React.__spread({className: bodyClass},  getProps()), 
          children
        )
      );
    }

    function maybeRenderPanelBody () {
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

      allChildren.forEach(function(child) {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      }.bind(this));

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill: function (child) {
    return React.isValidElement(child) && child.props.fill != null;
  },

  renderHeading: function () {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsable ?
        this.renderCollapsableTitle(header) : header;
    } else if (this.props.collapsable) {
      header = cloneWithProps(header, {
        className: this.prefixClass('title'),
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = cloneWithProps(header, {
        className: this.prefixClass('title')
      });
    }

    return (
      React.createElement("div", {className: this.prefixClass('heading')}, 
        header
      )
    );
  },

  renderAnchor: function (header) {
    return (
      React.createElement("a", {
        href: '#' + (this.props.id || ''), 
        className: this.isExpanded() ? null : 'collapsed', 
        "aria-expanded": this.isExpanded() ? 'true' : 'false', 
        onClick: this.handleSelect}, 
        header
      )
    );
  },

  renderCollapsableTitle: function (header) {
    return (
      React.createElement("h4", {className: this.prefixClass('title')}, 
        this.renderAnchor(header)
      )
    );
  },

  renderFooter: function () {
    if (!this.props.footer) {
      return null;
    }

    return (
      React.createElement("div", {className: this.prefixClass('footer')}, 
        this.props.footer
      )
    );
  }
});

module.exports = Panel;

});
