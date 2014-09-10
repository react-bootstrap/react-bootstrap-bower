define(function (require, exports, module) {/** @jsx React.DOM */

var React = require('react');
var CustomPropTypes = require('./utils/CustomPropTypes');


var Row = React.createClass({displayName: 'Row',
  propTypes: {
    componentClass: CustomPropTypes.componentClass.isRequired
  },

  getDefaultProps: function () {
    return {
      componentClass: React.DOM.div
    };
  },

  render: function () {
    var componentClass = this.props.componentClass;

    return this.transferPropsTo(
      componentClass( {className:"row"}, 
        this.props.children
      )
    );
  }
});

module.exports = Row;
});
