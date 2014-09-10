define(function (require, exports, module) {/** @jsx React.DOM */

var React = require('react');
var classSet = require('./utils/classSet');
var cloneWithProps = require('./utils/cloneWithProps');
var ValidComponentChildren = require('./utils/ValidComponentChildren');
var createChainedFunction = require('./utils/createChainedFunction');

var ListGroup = React.createClass({displayName: 'ListGroup',
  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      React.DOM.div( {className:"list-group"}, 
        ValidComponentChildren.map(this.props.children, this.renderListItem)
      )
    );
  },

  renderListItem: function (child) {
    return cloneWithProps(child, {
      onClick: createChainedFunction(child.props.onClick, this.props.onClick),
      ref: child.props.ref,
      key: child.props.key
    });
  }
});

module.exports = ListGroup;

});
