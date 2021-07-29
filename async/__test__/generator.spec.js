const { timeStamp } = require("console");

test('测试generator', (done) => {
  const src = require('../generator')
  const fn = src()

  setTimeout(done, 1000)

  // console.log(fn.next())
  // console.log(fn.next())
  // console.log(fn.next())
  // console.log(fn.next())

  // for (const value of fn) {
  //   console.log(value)
  // }
})