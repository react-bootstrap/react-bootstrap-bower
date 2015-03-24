define(function (require, exports, module) {var React = require('react');
var classSet = require('classnames');
var BootstrapMixin = require('./BootstrapMixin');

var Well = React.createClass({displayName: "Well",
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'well'
    };
  },

  render: function () {
    var classes = this.getBsClassSet();

    return (
      React.createElement("div", React.__spread({},  this.props, {className: classSet(this.props.className, classes)}), 
        this.props.children
      )
    );
  }
});

module.exports = Well;
});
