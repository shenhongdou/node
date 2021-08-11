function decorator (target, property, descriptor) {
  process.nextTick(() => {
    console.log('方法装饰器')
    console.log(target.a, 'a')
  })
  
  // console.log(target, property, descriptor)
  // console.log(target[property])
}

function classD (target) {
  console.log('classD')
  target.prototype.a = 1
}

// 方法装饰器先执行
// class装饰器后执行

@classD
class DecoratorExample {
  @decorator
  log () {
    console.log(1111)
  }
}