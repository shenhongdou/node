# node
node学习记录

## auto-gen-test
自动集成测试代码

## async 异步编程解决方案
    1.callback 会导致回调地狱
    2.promise promise对象表示一个尚且未完成且预计在未来完成的异步操作
    3.generator
    4.async await 异步编程终极解决方案
    5.EventEmitor

## http-cache http缓存
### 强缓存 在浏览器内部就完成
    1.HTTP 1.0 Expires server端设置Expires响应头为过期时间，浏览器根据这个时间比对，缺点：浏览器时间不能保证准确性
    2.HTTP 1.1 cache-control  当cache-control和expires字段都存在时，cache-control的优先级比expires高。
      cache-control主要有: 
        max-age：时间长度，单位秒，表示该资源过了多少秒后失效，不依赖客户端时间 max-age=xxx
        s-maxage、
        public：所有内容都将被缓存，客户端和代理服务器都可以缓存
        private：内容只缓存到私有缓存中，客户端可以缓存
        no-cache：需要使用协商缓存来验证缓存数据
        no-store：所有内容都不会缓存


### 协商缓存
    1.last-modified&if-modified-since 一组通过协商修改时间为基础的策略。
        服务端返回last-modified给浏览器，浏览器在下次请求的时候通过if-modified-since
        带上服务端上一次返回的last-modified时间给服务器，服务器来判断缓存是否过期，
        过期，返回最新内容，未过期，返回304状态码，不返回内容。
    2.etag&if-none-match 一组基于内容协商的策略。
        一般的做法是将返回的内容进行摘要（hash），然后通过对比摘要来判断内容是否更新。


### ajax缓存、发生在get请求

### ServiceWorker缓存

## spider 爬虫

## OAuth 开放授权
三方登录主要基于OAuth 2.0。与以往的授权方式不同之处是OAuth的授权不会使第三方触及到用户的账号信息，如用户名、密码。
即，第三方无需使用用户的用户名密码就可以申请获得该资源的授权，因此OAuth是安全的。

## redis
