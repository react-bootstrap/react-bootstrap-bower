define(
  ["./react-es6","./react-es6/lib/cx","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];

    var PageItem = React.createClass({displayName: 'PageItem',

      propTypes: {
        disabled: React.PropTypes.bool,
        previous: React.PropTypes.bool,
        next: React.PropTypes.bool,
        onSelect: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          href: '#'
        };
      },

      render: function () {
        var classes = {
          'disabled': this.props.disabled,
          'previous': this.props.previous,
          'next': this.props.next
        };

        return this.transferPropsTo(
          React.DOM.li(
            {className:classSet(classes)}, 
            React.DOM.a(
              {href:this.props.href,
              title:this.props.title,
              onClick:this.handleSelect,
              ref:"anchor"}, 
              this.props.children
            )
          )
        );
      },

      handleSelect: function (e) {
        if (this.props.onSelect) {
          e.preventDefault();

          if (!this.props.disabled) {
            this.props.onSelect(this.props.key, this.props.href);
          }
        }
      }
    });

    __exports__["default"] = PageItem;
  });