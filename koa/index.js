// const Koa = require('koa')
// const app = new Koa()

// app.use(async (ctx, next) => {
//   console.log(1)
//   await next()
//   console.log(4)
// })

// app.use(async (ctx, next) => {
//   console.log(2)
//   await next()
//   console.log(3)
// })

// app.listen(3004, () => {
//   console.log('server start at port 3004')
// })

const KKB = require('./KKB')
const app = new KKB()

const delay = (time = 100) => new Promise((resolve) => {
  setTimeout(resolve, time)
})

app.use(async (ctx, next) => {
  console.log(1)
  await delay()
  console.log(5)
  await next()
  console.log(4)
})

app.use(async (ctx, next) => {
  console.log(2)
  await next()
  console.log(3)
})


app.listen(3004, () => {
  console.log('server start at port 3004')
})
