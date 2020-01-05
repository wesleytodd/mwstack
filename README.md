# A Stack of Middleware

[![NPM Version](https://badgen.net/npm/v/mwstack?icon=npm)](https://npmjs.org/package/mwstack)
[![NPM Downloads](https://badgen.net/npm/dm/mwstack?icon=npm)](https://npmjs.org/package/mwstack)
[![JS Standard Style](https://badgen.net/badge/code%20style/standard/blue)](https://github.com/standard/standard)

A stack/array of Express style middleware.

## Usage

```
$ npm install --save mwstack
```

```javascript
const app = require('express')()
const {Stack} = require('mwstack')

// Create a stack with some middleware
const stack = new Stack()
  .use(function (req, res, next) {
    // do stuff
    next()
  }, function (req, res) {
    // do other stuff
    // send response
    res.send()
  })
  .error(function (err, req, res, next) {
    // handle errors
    next()
  })

// Hook into express
app.use(stack)
```

## API

### `new Stack([...mw])`

Create a new stack. A stack is an array like object with a few additional methods.

#### `stack.use(...mw)`

Add middleware to the stack.  Middleware are added in order and arrays are not flattened.

#### `stack.error(...mw)`

Add error middleware to the stack.  Error middleware are added in order and arrays are not flattened.

#### `stack.infer(...mw)`

Add normal middleware or error middleware to the stack, infer they type based on the arity of the function (0-3 args is normal, 4 args is error).  This behavior is the legacy behavior Express used to infer the middleware type.

### `new FlatStack([...mw])`

Create a new flat stack. These are the same as `Stack` except arrays of middleware are flattened when added.

### `isError(fnc)`

Returns `true` when the middleware was added to a stack as an error middleware.

### `IS_ERROR`

A `symbol` used internally to label middleware functions as errors.
