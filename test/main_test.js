import assert from 'power-assert'
const lambda = require('../dist/index')

describe('lambda', () => {
  it('success', (done) => {
    lambda.handler({"aa":1}, {}, (err, result) => {
      assert(result !== null)
      done()
    })
  })
})

