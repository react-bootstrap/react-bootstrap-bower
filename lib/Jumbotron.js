define(function (require, exports, module) {var React = require('react');
var classSet = require('classnames');

var Jumbotron = React.createClass({displayName: "Jumbotron",

  render: function () {
    return (
      React.createElement("div", React.__spread({},  this.props, {className: classSet(this.props.className, 'jumbotron')}), 
        this.props.children
      )
    );
  }
});

module.exports = Jumbotron;
});
