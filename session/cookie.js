const Koa = require('koa')
const session = require('koa-session')

const app = new Koa()
app.keys = ['some secret']

const SESSION_CONFIG = {
  key: 'kkb:sess',
  maxAge: 86400000,
  httpOnly: true,
  signed: true,
}

app.use(session(SESSION_CONFIG, app))

app.use(async (ctx, next) => {
  if (ctx.url === '/favicon.ico') return
  let n = ctx.session.count || 0
  ctx.session.count = ++n

  ctx.session.dbcount = n*2
  console.log(ctx.session, 'session')
  ctx.body = n
})

app.listen(3000, () => {
  console.log('server start at port 3000')
})