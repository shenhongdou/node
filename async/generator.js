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


// module.exports = asyncFunc
module.exports = generator