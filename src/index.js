/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var guarded = require('guarded')
  var funAssert = require('fun-assert')
  var R = require('ramda')

  var isFunction = funAssert.type('Function')
  var isNumber = funAssert.type('Number')
  var isArray = funAssert.type('Array')
  var isStringArray = funAssert.type('[String]')
  var isObject = funAssert.type('Object')

  /* exports */
  module.exports = guarded({
    inputs: [isFunction, isNumber, isArray],
    f: funCurry,
    output: isFunction
  })

  module.exports.options = guarded({
    inputs: [isFunction, isStringArray, isObject],
    f: curryOptions,
    output: isFunction
  })

  /**
   *
   * @function module:fun-curry.funCurry
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
        ? R.apply(f, newArgs)
        : funCurry(f, arity, newArgs)
    }
  }

  /**
   *
   * @function module:fun-curry.options
   *
   * @param {Function} f - to curry
   * @param {Array<String>} keys - all keys required prior to executing f
   * @param {Object} [options] - initial options to apply
   *
   * @return {Function} { k1 } -> { k2 } -> ... -> f({ k1, k2, ... })
   */
  function curryOptions (f, keys, options) {
    options = options || {}

    return function optionsCurried (partialOptions) {
      var newOptions = R.merge(options, partialOptions)

      console.log(newOptions)

      return R.difference(keys, R.keys(newOptions)).length === 0
        ? R.call(f, newOptions)
        : curryOptions(f, keys, newOptions)
    }
  }
})()

