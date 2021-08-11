const { resolve } = require("path")

function* asyncFunc () {
  console.log(1)
  yield 'one'
  console.log(2)
  yield 'two'
  console.log(3)
  return 'three'
}


function promi (text, delay = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(text, 'text--')
      resolve()
    }, delay)
  })
}

function generator () {
  const ge = function* () {
    yield promi('log1')
    yield promi('log2')
    yield promi('log3')
  }

  const co = (ge) => {
    let it = ge.next().value
    if (!it) return
    
    it.then(() => {
      co(ge)
    })
  }

  co(ge())
}

const s = 'aaa_aa_a'

const r1 = /a+/g
const r2 = /a+/y

// console.log(r1.exec(s))
// console.log(r2.exec(s))

// // console.log(r1.exec(s))
// console.log(r2.exec(s))

const arr = [1,]
arr.forEach((item) => {
  console.log(item, 'item--')
})


module.exports = generator