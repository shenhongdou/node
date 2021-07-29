const path = require('path')
const fs = require('fs')

import { TTestNow } from './types'

class TestNow implements TTestNow {

  genJestSource (sourceDir: string) {
    const testDirname = path.resolve(sourceDir, '__test__')

    if (!fs.existsSync(testDirname)) {
      fs.mkdirSync(testDirname)
    }

    const list = fs.readdirSync(sourceDir)
    .map(f => path.resolve(sourceDir, f))
    .filter(f => fs.statSync(f).isFile())
    .filter(f => f.indexOf('.spec') === -1)
    list.forEach(f => this.genTestFile(f))
    console.log(list, 'list')
  }

  genTestFile (sourceFilePath) {
    const testFileName = this.getTestFileName(sourceFilePath)
    
    if (fs.existsSync(testFileName)) {
      console.log('该测试代码已存在', testFileName)
      return
    }

    const mod = require(sourceFilePath)
    const basename = path.basename(sourceFilePath)
    const extname = path.extname(sourceFilePath)

    let source
    if (typeof mod === 'function') {
      source = this.getTestSource(basename.replace(extname, ''), sourceFilePath, false)
    } else if (typeof mod === 'object') {     
      source = Object.keys(mod)
        .map(key => this.getTestSource(key, sourceFilePath))
        .join('\n')
    }

    fs.writeFileSync(testFileName, source)
  }

  getTestSource (method: string, filename: string, isClass: boolean = true) {
    const basename = path.basename(filename)
    return `
test('TEST ${method}', () => {
  const ${ isClass ? `{ ${method} }` : method } = require('../${basename}')
  const ret = ${method}()
  // expect(ret)
  //  .toBe()
})
    `
  }

  /**
   * 根据传入的文件名，生成jest测试文件名
   * @param sourceFilePath 
   */
  getTestFileName (sourceFilePath: string) {
    const dirname = path.dirname(sourceFilePath) // 获取传入的文件路径的文件夹名
    const basename = path.basename(sourceFilePath) // 获取传入的文件路径的文件名
    const extname = path.extname(sourceFilePath) // 获取传入的文件路径的文件后缀

    const testFileName = basename.replace(extname, `.spec${extname}`)
    const root = path.join(dirname, '__test__', '/')

    return path.format({
      root,
      base: testFileName
    })
  }
}

const testnow = new TestNow()

module.exports = testnow

