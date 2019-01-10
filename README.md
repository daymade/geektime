# geektime

> API client for time.geekbang.org (极客时间)

## INSTALL
```bash
npm install geektime
# or
yarn add geektime
```

geektime-cli 现在导出不了, 好像是登录挂了.

我们直接贴 cookie 绕过之后即可正常使用.

安装步骤如下:

```bash
mkdir temp && cd temp

git clone git@github.com:daymade/geektime.git
cd geektime && npm install

# !important: paste your cookie at line 49 of index.js

cd ..

git clone git@github.com:daymade/geektime-cli.git
cd geektime-cli && npm install

npm link ../geektime

# enjoy
node ./bin/geektime.js products
node ./bin/geektime.js e 116
```

## EXAMPLE
```js
const Geektime = require('geektime');
const client = new Geektime('phone', 'pass');

(async () => {

  try {
    const products = await client.products();
    console.log(products);
  } catch (error) {
    console.error(error);
  }

})();
```

## API

### init

`new Geektime([country], phone, password)`

country 为可选，如果不传，当 86 处理

### products()

返回产品列表 (专栏/视频课/微课/其他)

### intro(cid)

返回专栏信息

### articles(cid, size = 1000)

返回专栏文章列表

### article(id)

返回单篇文章详情

### comments(aid, size = 200, prev = 0)

返回专栏文章评论

### audios(cid, size = 1000)

返回音频列表

### NOTE

| param | note |
| --- | --- |
| cid | 专栏 id |
| id | 文章 id |

## License

MIT
