define(function (require, exports, module) {var React = require('react');
var classSet = require('classnames');

var Row = React.createClass({displayName: "Row",
  propTypes: {
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: 'div'
    };
  },

  render: function () {
    var ComponentClass = this.props.componentClass;

    return (
      React.createElement(ComponentClass, React.__spread({},  this.props, {className: classSet(this.props.className, 'row')}), 
        this.props.children
      )
    );
  }
});

module.exports = Row;
});
