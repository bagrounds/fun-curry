/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var stringify = require('./lib/stringify-anything')

  /* exports */
  module.exports = curry

  /**
   *
   * @function module:fun-curry.curry
   *
   * @param {Function} f - function to curry
   * @param {Number} [arity] - number of arguments f should accept
   * @param {Array} [args] - initial arguments to apply
   *
   * @return {Function} a_1 -> a_2 -> ... -> a_arity -> f(a_1, ..., a_arity)
   */
  function curry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    checkInputs(f, arity, args)

    return setProp('name', partialName(f, args, arity),
      setProp('length', arity, function () {
        var newPartialArgs = Array.prototype.slice.call(arguments)

        var newArgs = args.concat(
          newPartialArgs.length ? newPartialArgs : [undefined]
        )

        return newArgs.length >= arity
          ? f.apply(null, newArgs)
          : setProp('length', arity - newArgs.length, curry(f, arity, newArgs))
      })
    )
  }

  function checkInputs (f, arity, args) {
    if (typeof f !== 'function') {
      throw Error(stringify(f) + ' should be a function')
    }

    if (typeof arity !== 'number') {
      throw Error(stringify(arity) + ' should be a number')
    }

    if (!(args instanceof Array)) {
      throw Error(stringify(args) + ' should be an Array')
    }
  }

  function partialName (f, args, n) {
    return f.name
      ? f.name + stringifyArgs(args, n)
      : stringifyArgs(args, n) + '=>'
  }

  function stringifyArgs (args, n) {
    return '(' + args
      .map(stringify)
      .concat(
        Array.apply(null, { length: n - args.length }).map(function () {
          return ''
        })
      ).join(',') + ')'
  }

  function setProp (key, value, target) {
    return Object.defineProperty(target, key, { value: value })
  }
})()

