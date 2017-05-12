;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var funTest = require('fun-test')
  var compose = require('fun-compose')
  var apply = require('fun-apply')

  function arrayOf (x) {
    return [x]
  }

  function pair (a, b) {
    return [a, b]
  }

  function k (x) {
    return function () {
      return x
    }
  }

  /* exports */
  module.exports = [
    {
      inputs: [pair, 2, ['a']],
      predicate: compose(predicate.equalDeep(['a', 'b']), apply(['b']))
    },
    {
      inputs: [pair, 2],
      predicate: compose(predicate.equalDeep(['a', 'b']), apply(['a', 'b']))
    },
    {
      inputs: [arrayOf],
      predicate: compose(predicate.equalDeep([undefined]), apply([]))
    },
    {
      inputs: [],
      predicate: predicate.throwsWith([pair, 2, ' ']),
      contra: k
    },
    {
      inputs: [],
      predicate: predicate.throwsWith([pair, ' ']),
      contra: k
    },
    {
      inputs: [],
      predicate: predicate.throwsWith(['']),
      contra: k
    },
    {
      inputs: [arrayOf],
      predicate: compose(
        predicate.type('[Function]'),
        apply([function () {}])
      )
    },
    {
      inputs: [arrayOf],
      predicate: compose(
        predicate.equalDeep([['a', 2, true, null, { a: undefined }, pair]]),
        apply([['a', 2, true, null, { a: undefined }, pair]])
      )
    },
    {
      inputs: [function () {}, 3, [{ a: [] }]],
      predicate: compose(predicate.type('Function'), apply([]))
    },
    {
      inputs: [
        Math.pow,
        3,
        [[['a', 2, true, null, { a: undefined }, /^.$/, pair, function () {},
          Error('!'), { a: {} }]]]
      ],
      predicate: compose(predicate.type('Function'), apply([]))
    },
    {
      inputs: [Math.pow],
      predicate: compose(predicate.equal(8), apply([2, 3]))
    },
    {
      inputs: [Math.pow],
      predicate: compose(predicate.type('Function'), apply([3]))
    },
    {
      inputs: [Math.pow],
      predicate: compose(
        predicate.equal(9),
        compose(apply([2]), apply([3]))
      )
    }
  ].map(funTest.sync)
})()

