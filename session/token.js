const jsonwebtoken = require('jsonwebtoken')

const secret = '1234567'

const opt = {
  secret: 'jwt_secret',
  key: 'user'
}

const user = {
  userId: 'SHD'
}

const token = jsonwebtoken.sign({
  data: user,
  exp: Math.floor(Date.now()/1000) + 60*60
}, secret)

console.log(token, 'token')

console.log(jsonwebtoken.verify(token, secret))