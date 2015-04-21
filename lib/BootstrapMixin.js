define(["exports", "module", "./styleMaps", "./utils/CustomPropTypes"], function (exports, module, _styleMaps, _utilsCustomPropTypes) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var styleMaps = _interopRequire(_styleMaps);

  var CustomPropTypes = _interopRequire(_utilsCustomPropTypes);

  var BootstrapMixin = {
    propTypes: {
      bsClass: CustomPropTypes.keyOf(styleMaps.CLASSES),
      bsStyle: CustomPropTypes.keyOf(styleMaps.STYLES),
      bsSize: CustomPropTypes.keyOf(styleMaps.SIZES)
    },

    getBsClassSet: function getBsClassSet() {
      var classes = {};

      var bsClass = this.props.bsClass && styleMaps.CLASSES[this.props.bsClass];
      if (bsClass) {
        classes[bsClass] = true;

        var prefix = bsClass + "-";

        var bsSize = this.props.bsSize && styleMaps.SIZES[this.props.bsSize];
        if (bsSize) {
          classes[prefix + bsSize] = true;
        }

        var bsStyle = this.props.bsStyle && styleMaps.STYLES[this.props.bsStyle];
        if (this.props.bsStyle) {
          classes[prefix + bsStyle] = true;
        }
      }

      return classes;
    },

    prefixClass: function prefixClass(subClass) {
      return styleMaps.CLASSES[this.props.bsClass] + "-" + subClass;
    }
  };

  module.exports = BootstrapMixin;
});