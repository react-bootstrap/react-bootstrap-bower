define(['exports', 'module', './utils/Object.assign', './utils/deprecationWarning', './CollapsibleMixin'], function (exports, module, _utilsObjectAssign, _utilsDeprecationWarning, _CollapsibleMixin) {
  'use strict';

  function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

  var _assign = _interopRequire(_utilsObjectAssign);

  var _deprecationWarning = _interopRequire(_utilsDeprecationWarning);

  var _CollapsibleMixin2 = _interopRequire(_CollapsibleMixin);

  var link = 'https://github.com/react-bootstrap/react-bootstrap/issues/425#issuecomment-97110963';

  var CollapsableMixin = (0, _assign)({}, _CollapsibleMixin2, {
    getCollapsableClassSet: function getCollapsableClassSet(className) {
      (0, _deprecationWarning)('CollapsableMixin.getCollapsableClassSet()', 'CollapsibleMixin.getCollapsibleClassSet()', link);
      return _CollapsibleMixin2.getCollapsibleClassSet.call(this, className);
    },

    getCollapsibleDOMNode: function getCollapsibleDOMNode() {
      (0, _deprecationWarning)('CollapsableMixin.getCollapsableDOMNode()', 'CollapsibleMixin.getCollapsibleDOMNode()', link);
      return this.getCollapsableDOMNode();
    },

    getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
      (0, _deprecationWarning)('CollapsableMixin.getCollapsableDimensionValue()', 'CollapsibleMixin.getCollapsibleDimensionValue()', link);
      return this.getCollapsableDimensionValue();
    },

    componentDidMount: function componentDidMount() {
      (0, _deprecationWarning)('CollapsableMixin', 'CollapsibleMixin', link);
    }
  });

  module.exports = CollapsableMixin;
});