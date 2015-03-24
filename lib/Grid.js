define(function (require, exports, module) {var React = require('react');
var classSet = require('classnames');

var Grid = React.createClass({displayName: "Grid",
  propTypes: {
    fluid: React.PropTypes.bool,
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;
    var className = this.props.fluid ? 'container-fluid' : 'container';

    return (
      React.createElement(ComponentClass, React.__spread({}, 
        this.props, 
        {className: classSet(this.props.className, className)}), 
        this.props.children
      )
    );
  }
});

module.exports = Grid;
});
