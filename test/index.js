'use strict'
const assert = require('assert')
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const mwStack = require('..')
const Stack = mwStack.Stack
const FlatStack = mwStack.FlatStack
const isError = mwStack.isError

function one (req, res) {}
function two (req, res, next) {}
function three (err, req, res, next) {} // eslint-disable-line

console.log('Node Version', process.version)
describe('mwstack', function () {
  it('should add handlers to a Stack', function () {
    const s = new Stack()
    assert(s instanceof Array)
    assert.strictEqual(s.length, 0)

    s.use(one, two)
    assert.strictEqual(s.length, 2)

    s.error(three)
    assert.strictEqual(s.length, 3)

    assert.strictEqual(isError(s[0]), false)
    assert.strictEqual(isError(s[1]), false)
    assert.strictEqual(isError(s[2]), true)
  })

  it('should add handlers to a FlatStack', function () {
    const s = new FlatStack()
    assert(s instanceof Array)
    assert.strictEqual(s.length, 0)

    s.use([one, two])
    assert.strictEqual(s.length, 2)

    s.error([three, [three, [three]]])
    assert.strictEqual(s.length, 5)

    assert.strictEqual(isError(s[0]), false)
    assert.strictEqual(isError(s[1]), false)
    assert.strictEqual(isError(s[2]), true)
    assert.strictEqual(isError(s[3]), true)
    assert.strictEqual(isError(s[4]), true)
  })

  it('should infer handler type from arity', function () {
    const s = new Stack(one, two, three)
    assert(s instanceof Array)
    assert.strictEqual(s.length, 3)

    assert.strictEqual(isError(s[0]), false)
    assert.strictEqual(isError(s[1]), false)
    assert.strictEqual(isError(s[2]), true)
  })
})
