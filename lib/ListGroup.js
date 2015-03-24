define(function (require, exports, module) {var React = require('react');
var classSet = require('classnames');
var cloneElement = React.cloneElement;

var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var ListGroup = React.createClass({displayName: "ListGroup",
  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      React.createElement("div", {className: "list-group"}, 
        ValidComponentChildren.map(this.props.children, this.renderListItem)
      )
    );
  },

  renderListItem: function (child, index) {
    return cloneElement(child, {
      key: child.key ? child.key : index
    });
  }
});

module.exports = ListGroup;

});
