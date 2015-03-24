define(function (require, exports, module) {var React = require('react');

var classSet = require('classnames');
var BootstrapMixin = require('./BootstrapMixin');

var Label = React.createClass({displayName: "Label",
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      React.createElement("span", React.__spread({},  this.props, {className: classSet(this.props.className, classes)}), 
        this.props.children
      )
    );
  }
});

module.exports = Label;
});
