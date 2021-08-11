// const Koa = require('koa')
// const app = new Koa()

// app.use(async (ctx, next) => {
//   ctx.body = 1
//   next()
//   console.log(ctx, 'ctx')
//   console.log(ctx.method)
// })


// app.listen(3004, () => {
//   console.log('server start at port 3004')
// })

const Koa = require('./Koa')
const app = new Koa()

const delay = (time = 100) => new Promise((resolve) => {
  setTimeout(resolve, time)
})

app.use(async (ctx, next) => {
  ctx.body = '1'
  await next()
})

app.listen(3004, () => {
  console.log('server start at port 3004')
})

app.get('/', function (ctx) {
  ctx.body = '1'
})

app.get('/abc', function (ctx) {
  ctx.body = 'abc'
})


// const compose = (firstFn, ...resetFns) => (...args) => {
//   let ret = firstFn(...args)
//   resetFns.forEach(fn => {
//     ret = fn(ret)
//   })

//   return ret
// }

// const compose2 = (firstFn, ...resetFns) => 
//   (...args) => resetFns.reduce((acc, cur) => cur(acc), firstFn(...args))

// const add = (x, y) => x + y
// const square = x => x * x

// console.log(compose(add, square, square, square)(1, 2)) 
// console.log(compose2(add, square, square, square)(1, 2))