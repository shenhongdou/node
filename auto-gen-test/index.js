"use strict";
exports.__esModule = true;
var path = require('path');
var fs = require('fs');
var TestNow = /** @class */ (function () {
    function TestNow() {
    }
    TestNow.prototype.genJestSource = function (sourceDir) {
        var _this = this;
        var testDirname = path.resolve(sourceDir, '__test__');
        if (!fs.existsSync(testDirname)) {
            fs.mkdirSync(testDirname);
        }
        var list = fs.readdirSync(sourceDir)
            .map(function (f) { return path.resolve(sourceDir, f); })
            .filter(function (f) { return fs.statSync(f).isFile(); })
            .filter(function (f) { return f.indexOf('.spec') === -1; });
        list.forEach(function (f) { return _this.genTestFile(f); });
    };
    TestNow.prototype.genTestFile = function (sourceFilePath) {
        var _this = this;
        var testFileName = this.getTestFileName(sourceFilePath);
        if (fs.existsSync(testFileName)) {
            console.log('该测试代码已存在', testFileName);
            return;
        }
        var mod = require(sourceFilePath);
        var basename = path.basename(sourceFilePath);
        var source;
        if (typeof mod === 'function') {
            source = this.getTestSource(basename.replace('.js', ''), sourceFilePath, false);
        }
        else if (typeof mod === 'object') {
            source = Object.keys(mod)
                .map(function (key) { return _this.getTestSource(key, sourceFilePath); })
                .join('\n');
        }
        fs.writeFileSync(testFileName, source);
    };
    TestNow.prototype.getTestSource = function (method, filename, isClass) {
        if (isClass === void 0) { isClass = true; }
        var basename = path.basename(filename);
        return "\ntest('TEST " + method + "', () => {\n  const src = require('../" + basename + "')\n  const " + method + " = " + (isClass ? 'src.' + ("" + method) : 'src') + "\n  const ret = " + method + "()\n  // expect(ret)\n  //  .toBe()\n})\n    ";
    };
    /**
     * 根据传入的文件名，生成jest测试文件名
     * @param sourceFilePath
     */
    TestNow.prototype.getTestFileName = function (sourceFilePath) {
        var dirname = path.dirname(sourceFilePath); // 获取传入的文件路径的文件夹名
        var basename = path.basename(sourceFilePath); // 获取传入的文件路径的文件名
        var extname = path.extname(sourceFilePath); // 获取传入的文件路径的文件后缀
        var testFileName = basename.replace(extname, ".spec" + extname);
        var root = path.join(dirname, '__test__', '/');
        return path.format({
            root: root,
            base: testFileName
        });
    };
    return TestNow;
}());
var testnow = new TestNow();
module.exports = testnow;
