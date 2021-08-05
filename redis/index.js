const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const fs = require('fs');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const redis = require('redis')

// 首页路由
const router = new Router();
router.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});
app.use(router.routes());

const rclient = redis.createClient()
rclient.on("ready", err => {
    console.log('client ready ....');
})

rclient.on('error', error => {
  // console.log(error, 'error')
})

const publish = redis.createClient()
publish.on('ready', err => {
    console.log('publish ready ...')
})

publish.on('error', err => {
  // console.log(err, 'err')
})

// socket连接
io.on('connection', (socket) => {
  console.log('connection')
    // 经典模式
    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    //     io.emit('chat message', msg);
    // });
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });

    // redis模式
    // 订阅
    rclient.subscribe('chat')
    // 收到消息后将推送消息
    rclient.on('message', (channel, msg) => {
        io.emit('chat message', msg)
    })
    socket.on('chat message', msg => {
        console.log('receive message:' + msg)
        publish.publish('chat', msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

// 监听端口
server.listen(3000, () => {
  console.log('listening on *:3000');
});