'use strict'
const { flatten } = require('array-flatten')
const slice = Array.prototype.slice

// Is error symbol, can override if necessary
module.exports.IS_ERROR = Symbol('is-error')

const Stack = module.exports.Stack = class Stack extends Array {
  constructor () {
    super()
    arguments.length && this.infer.apply(this, slice.call(arguments))
  }

  use () {
    slice.call(arguments).forEach((fnc) => {
      this.push(fnc)
    })
    return this
  }

  error () {
    slice.call(arguments).forEach((fnc) => {
      // Wrap the original function so we don't have to modify the input
      function errWrap (err, req, res, next) {
        fnc(err, req, res, next)
      }
      errWrap[module.exports.IS_ERROR] = true
      this.push(errWrap)
    })
    return this
  }

  infer () {
    slice.call(arguments).forEach((fnc) => {
      fnc.length === 4 ? this.error(fnc) : this.use(fnc)
    })
    return this
  }
}

module.exports.FlatStack = class FlatStack extends Stack {
  constructor () {
    super(flatten(slice.call(arguments)))
  }

  use () {
    return super.use.apply(this, flatten(slice.call(arguments)))
  }

  error () {
    return super.error.apply(this, flatten(slice.call(arguments)))
  }

  infer () {
    return super.infer.apply(this, flatten(slice.call(arguments)))
  }
}

module.exports.isError = function (fnc) {
  return !!(fnc && fnc[module.exports.IS_ERROR] === true)
}
