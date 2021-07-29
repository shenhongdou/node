const fs = require('fs')
const path = require('path')

test('测试传入文件夹，自动生成文件夹下所有文件所有方法的测试用例', () => {
  fs.rmdirSync(path.join(__dirname, 'data', '__test__'), {
    recursive: true 
  })
  const src = require('../index')
  src.genJestSource(path.resolve(__dirname, '../data'))
})