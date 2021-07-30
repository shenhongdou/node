const http = require('http')


const updateTime = () => {
  return new Date().toUTCString()
  // setInterval(() => {
  //   this.time = new Date().toUTCString()
  // }, 1000);

  // return this.time
}

http.createServer((req, res) => {
  if (req.url === '/') {
    res.end(`
      <html>
      html update time: ${updateTime()}

      <script src="main.js"></script>
      </html>
    `)
    return
  }

  if (req.url === '/main.js') {
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    res.end(`
      document.writeln('<br> js update time: ${updateTime()}')
    `)
    return
  }

  if (req.url === '/favicon.ico') {
    res.end('')
  }
})
.listen(3000, () => {
  console.log('http cache test on port 3000')
})