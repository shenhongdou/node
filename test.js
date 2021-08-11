const fn = async function () {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(1)
      resolve()
    }, 1000)
  })

  console.log(2)

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(3)
      resolve()
    }, 1000)
  })

  console.log(4)

}


fn()

console.log(5)