define(
  ["./react-es6","./ValidComponentChildren","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var ValidComponentChildren = __dependency2__["default"];

    var Badge = React.createClass({displayName: 'Badge',
      render: function () {
        return this.transferPropsTo(
          React.DOM.span( {className:ValidComponentChildren.hasValidComponent(this.props.children) ? 'badge': null}, 
            this.props.children
          )
        );
      }
    });

    __exports__["default"] = Badge;
  });