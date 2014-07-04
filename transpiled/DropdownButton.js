define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./DropdownStateMixin","./Button","./ButtonGroup","./DropdownMenu","./utils","./ValidComponentChildren","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var DropdownStateMixin = __dependency4__["default"];
    var Button = __dependency5__["default"];
    var ButtonGroup = __dependency6__["default"];
    var DropdownMenu = __dependency7__["default"];
    var utils = __dependency8__["default"];
    var ValidComponentChildren = __dependency9__["default"];


    var DropdownButton = React.createClass({displayName: 'DropdownButton',
      mixins: [BootstrapMixin, DropdownStateMixin],

      propTypes: {
        pullRight: React.PropTypes.bool,
        dropup:    React.PropTypes.bool,
        title:     React.PropTypes.renderable,
        href:      React.PropTypes.string,
        onClick:   React.PropTypes.func,
        onSelect:  React.PropTypes.func,
        navItem:   React.PropTypes.bool
      },

      render: function () {
        var className = 'dropdown-toggle';

        var renderMethod = this.props.navItem ?
          'renderNavItem' : 'renderButtonGroup';

        return this[renderMethod]([
          this.transferPropsTo(Button(
            {ref:"dropdownButton",
            className:className,
            onClick:this.handleDropdownClick,
            key:0,
            navDropdown:this.props.navItem,
            navItem:null,
            title:null,
            pullRight:null,
            dropup:null}, 
            this.props.title,' ',
            React.DOM.span( {className:"caret"} )
          )),
          DropdownMenu(
            {ref:"menu",
            'aria-labelledby':this.props.id,
            pullRight:this.props.pullRight,
            key:1}, 
            ValidComponentChildren.map(this.props.children, this.renderMenuItem)
          )
        ]);
      },

      renderButtonGroup: function (children) {
        var groupClasses = {
            'open': this.state.open,
            'dropup': this.props.dropup
          };

        return (
          ButtonGroup(
            {bsSize:this.props.bsSize,
            className:classSet(groupClasses)}, 
            children
          )
        );
      },

      renderNavItem: function (children) {
        var classes = {
            'dropdown': true,
            'open': this.state.open,
            'dropup': this.props.dropup
          };

        return (
          React.DOM.li( {className:classSet(classes)}, 
            children
          )
        );
      },

      renderMenuItem: function (child) {
        // Only handle the option selection if an onSelect prop has been set on the
        // component or it's child, this allows a user not to pass an onSelect
        // handler and have the browser preform the default action.
        var handleOptionSelect = this.props.onSelect || child.props.onSelect ?
          this.handleOptionSelect : null;

        return utils.cloneWithProps(
          child,
          {
            // Capture onSelect events
            onSelect: utils.createChainedFunction(child.props.onSelect, handleOptionSelect),

            // Force special props to be transferred
            key: child.props.key,
            ref: child.props.ref
          }
        );
      },

      handleDropdownClick: function (e) {
        e.preventDefault();

        this.setDropdownState(!this.state.open);
      },

      handleOptionSelect: function (key) {
        if (this.props.onSelect) {
          this.props.onSelect(key);
        }

        this.setDropdownState(false);
      }
    });

    __exports__["default"] = DropdownButton;
  });