// const http = require('http')

const { spawn } = require('child_process')

function run_cmd (sh, args, callback) {
  const child = spawn(sh, args)
  let resp = ''

  child.stdout.on('data', function (buffer) {
    resp += buffer
  })

  child.stdout.on('end', function () {
    callback(resp)
  })
}

run_cmd('sh', ['./ls.sh'], function (data) {
  console.log(data, 'data')
})


// http.createServer((req, res) => {
//   if (req.url === '/') {
//     run_cmd('sh', ['./ls.sh'], function (data) {
//       console.log(data, 'data')
//     })

//     res.end('hello ssh')
//   }
// }).listen(3000, () => {
//   console.log('server start at port 3000')
// })