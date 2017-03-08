/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* exports */
  module.exports = funCurry

  /**
   *
   * @function module:funCurry.funCurry
   *
   * @param {Function} f - to curry
   * @param {Number} [arity] - number of arguments f should accept
   * @param {Array} [args] - initial arguments to apply
   *
   * @return {Function} a_1 -> a_2 -> ... -> a_arity -> f(a_1, ..., a_arity)
   */
  function funCurry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    return function curried () {
      var newArgs = args.concat(Array.prototype.slice.call(arguments))

      return newArgs.length === arity
        ? f.apply(null, newArgs)
        : funCurry(f, arity, newArgs)
    }
  }
})()

