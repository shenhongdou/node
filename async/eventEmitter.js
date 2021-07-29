const fn = text => event => {
  setTimeout(() => {
    console.log(text)
    event.emit('end')
  }, 300)
}

const { EventEmitter } = require('events')
const event = new EventEmitter()

let arr = [
  fn('text1'),
  fn('text2'),
  fn('text3')
]

let i = 0
event.on('end', () => {
  arr[i] && arr[i++](event)
})

event.emit('end')