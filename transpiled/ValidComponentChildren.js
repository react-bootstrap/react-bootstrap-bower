define(
  ["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var React = __dependency1__["default"];


    /**
     * Maps children that are typically specified as `props.children`,
     * but only iterates over children that are "valid components".
     *
     * The mapFunction provided index will be normalised to the components mapped,
     * so an invalid component would not increase the index.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} mapFunction.
     * @param {*} mapContext Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapValidComponents(children, func, context) {
      var index = 0;

      return React.Children.map(children, function (child) {
        if (React.isValidComponent(child)) {
          var lastIndex = index;
          index++;
          return func.call(context, child, lastIndex);
        }

        return child;
      });
    }

    /**
     * Iterates through children that are typically specified as `props.children`,
     * but only iterates over children that are "valid components".
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child with the index reflecting the position relative to "valid components".
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc.
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachValidComponents(children, func, context) {
      var index = 0;

      return React.Children.forEach(children, function (child) {
        if (React.isValidComponent(child)) {
          func.call(context, child, index);
          index++;
        }
      });
    }

    /**
     * Count the number of "valid components" in the Children container.
     *
     * @param {?*} children Children tree container.
     * @returns {number}
     */
    function numberOfValidComponents(children) {
      var count = 0;

      React.Children.forEach(children, function (child) {
        if (React.isValidComponent(child)) { count++; }
      });

      return count;
    }

    /**
     * Determine if the Child container has one or more "valid components".
     *
     * @param {?*} children Children tree container.
     * @returns {boolean}
     */
    function hasValidComponent(children) {
      var hasValid = false;

      React.Children.forEach(children, function (child) {
        if (!hasValid && React.isValidComponent(child)) {
          hasValid = true;
        }
      });

      return hasValid;
    }

    __exports__["default"] = {
      map: mapValidComponents,
      forEach: forEachValidComponents,
      numberOf: numberOfValidComponents,
      hasValidComponent: hasValidComponent
    };
  });