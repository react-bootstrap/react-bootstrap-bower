define(function (require, exports, module) {var React = require('react');

var BootstrapMixin = require('./BootstrapMixin');
var classSet = require('classnames');
var cloneElement = React.cloneElement;

var ValidComponentChildren = require('./utils/ValidComponentChildren');

var ListGroupItem = React.createClass({displayName: "ListGroupItem",
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['danger','info','success','warning']),
    active: React.PropTypes.any,
    disabled: React.PropTypes.any,
    header: React.PropTypes.node,
    onClick: React.PropTypes.func,
    eventKey: React.PropTypes.any,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      bsClass: 'list-group-item'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    classes['active'] = this.props.active;
    classes['disabled'] = this.props.disabled;

    if (this.props.href || this.props.target || this.props.onClick) {
      return this.renderAnchor(classes);
    } else {
      return this.renderSpan(classes);
    }
  },

  renderSpan: function (classes) {
    return (
      React.createElement("span", React.__spread({},  this.props, {className: classSet(this.props.className, classes)}), 
        this.props.header ? this.renderStructuredContent() : this.props.children
      )
    );
  },

  renderAnchor: function (classes) {
    return (
      React.createElement("a", React.__spread({}, 
        this.props, 
        {className: classSet(this.props.className, classes)
      }), 
        this.props.header ? this.renderStructuredContent() : this.props.children
      )
    );
  },

  renderStructuredContent: function () {
    var header;
    if (React.isValidElement(this.props.header)) {
      header = cloneElement(this.props.header, {
        key: 'header',
        className: classSet(this.props.header.props.className, 'list-group-item-heading')
      });
    } else {
      header = (
        React.createElement("h4", {key: "header", className: "list-group-item-heading"}, 
          this.props.header
        )
      );
    }

    var content = (
      React.createElement("p", {key: "content", className: "list-group-item-text"}, 
        this.props.children
      )
    );

    return [header, content];
  }
});

module.exports = ListGroupItem;

});
