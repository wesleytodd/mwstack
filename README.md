# A Stack of Middleware

This is a small abstraction for construction of Express style middleware stacks.

The main goal is to support an edge case usage where the deprecation of arity based error handling was not covered in the new api.

## Usage

```
$ npm install --save mwstack
```

```
const app = require('express')()
const {Stack} = require('mwstack')

// Create a stack with some middleware
const stack = new Stack()
  .use(function (req, res, next) {
    // do stuff
    next()
  })
  .error(function (err, req, res, next) {
    // handle errors
    next()
  })

// Hook into express
app.use(stack)
```
