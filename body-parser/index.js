const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end(fs.readFileSync(__dirname +'/index.html', 'utf-8'))
  }
  if (req.url === '/upload' && req.method === 'POST') {
    // const data = []
    // let size = 0
    // req.on('data', (buffer) => {
    //   console.log(buffer)
    //   data.push(buffer)
    //   size += buffer.length
    // })

    // req.on('end', () => {
    //   const d = Buffer.concat(data, size)
    //   size = 0
    //   fs.writeFileSync(path.resolve(__dirname, 'img.png'), d)
    //   res.end()
    // })

    const fis = fs.createWriteStream('img1.png')
    req.pipe(fis)
    res.end()
  }
}).listen(3000, () => {
  console.log('server start at port 3000')
})