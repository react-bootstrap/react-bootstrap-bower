define(
  ["./react-es6","./utils","./ValidComponentChildren","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var utils = __dependency2__["default"];
    var ValidComponentChildren = __dependency3__["default"];

    var Pager = React.createClass({displayName: 'Pager',

      propTypes: {
        onSelect: React.PropTypes.func
      },

      render: function () {
        return this.transferPropsTo(
          React.DOM.ul(
            {className:"pager"}, 
            ValidComponentChildren.map(this.props.children, this.renderPageItem)
          )
        );
      },

      renderPageItem: function (child) {
        return utils.cloneWithProps(
          child,
          {
            onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),
            ref: child.props.ref,
            key: child.props.key
          }
        );
      }
    });

    __exports__["default"] = Pager;
  });