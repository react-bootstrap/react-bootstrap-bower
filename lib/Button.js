define(function (require, exports, module) {var React = require('react');

var classSet = require('classnames');
var BootstrapMixin = require('./BootstrapMixin');

var Button = React.createClass({displayName: "Button",
  mixins: [BootstrapMixin],

  propTypes: {
    active:   React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    block:    React.PropTypes.bool,
    navItem:    React.PropTypes.bool,
    navDropdown: React.PropTypes.bool,
    componentClass: React.PropTypes.node,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      bsClass: 'button',
      bsStyle: 'default',
      type: 'button'
    };
  },

  render: function () {
    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
    var renderFuncName;

    classes['active'] = this.props.active;
    classes['btn-block'] = this.props.block;

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ?
      'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor: function (classes) {

    var Component = this.props.componentClass || 'a';
    var href = this.props.href || '#';
    classes['disabled'] = this.props.disabled;

    return (
      React.createElement(Component, React.__spread({}, 
        this.props, 
        {href: href, 
        className: classSet(this.props.className, classes), 
        role: "button"}), 
        this.props.children
      )
    );
  },

  renderButton: function (classes) {
    var Component = this.props.componentClass || 'button';

    return (
      React.createElement(Component, React.__spread({}, 
        this.props, 
        {className: classSet(this.props.className, classes)}), 
        this.props.children
      )
    );
  },

  renderNavItem: function (classes) {
    var liClasses = {
      active: this.props.active
    };

    return (
      React.createElement("li", {className: classSet(liClasses)}, 
        this.renderAnchor(classes)
      )
    );
  }
});

module.exports = Button;

});
