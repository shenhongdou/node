const request = require('request')
const cheerio = require('cheerio')
const http = require('http')
const iconv = require('iconv-lite')

const url = 'https://www.ygdy8.com/html/gndy/dyzz/20210625/61567.html'

request(url, { encoding: null }, (error, data, body) => {
  const html = iconv.decode(body, 'gb2312')
  const $ = cheerio.load(html)
  console.log($('meta')[2].attribs.content)
})