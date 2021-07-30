const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const axios = require('axios')
const querystring = require('querystring')

const app = new Koa()

app.use(static(__dirname + '/'))

// A 网站让用户跳转到 GitHub。
// GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？"
// 用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码。
// A 网站使用授权码，向 GitHub 请求令牌。
// GitHub 返回令牌.
// A 网站使用令牌，向 GitHub 请求用户数据。

const config = {
  client_id: 'c62c922df0e23cd9f2d6',
  client_secret: '0ea2089a1f86b0f9b141782fc746016ba67b3b0c'
}

router.get('/github/login', async ctx => {
  ctx.redirect(`https://github.com/login/oauth/authorize?client_id=${config.client_id}`)
})

router.get('/auth/github/callback', async ctx => {
  const { code } = ctx.query
  console.log(code, 'code')

  const res = await axios.post('https://github.com/login/oauth/access_token', {
    ...config,
    code
  })

  const { access_token } = querystring.parse(res.data)
  if (!access_token) return
  console.log(access_token, 'access_token')
  let ret
  try {
    ret = await axios.get(`https://api.github.com/user?access_token=${access_token}`, {
      headers: {
        accept: 'application/json',
        Authorization: `token ${access_token}`
      }
    })
    console.log(ret, 'ret')
  } catch (error) {
    console.log(error, 'error')
  }

  ctx.body = `
    <html>
      <body>
        <h2>你好，${ret.data.login}</h2>
        <img src="${ret.data.avatar_url}" />
      </body>
    </html>
  `
})

app.use(router.routes())
app.listen(3001)