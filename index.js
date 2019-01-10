const axios = require('axios');

const host = 'https://time.geekbang.org/serv/v1';
const links = {
  login: 'https://account.geekbang.org/account/ticket/login',
  products: `${host}/my/products/all`,
  productList: `${host}/my/products/list`,
  intro: `${host}/column/intro`,
  articles: `${host}/column/articles`,
  article: `${host}/article`,
  comments: `${host}/comments`,
  audios: `${host}/column/audios`,
};

async function request(link, body = {}, cookie = '') {
  const headers = {
    Referer: 'https://servicewechat.com/wxc4f8a61ef62e6e35/20/page-frame.html',
    Cookie: cookie,
    "Content-Type": "application/json"
  };

  try {
    const res = await axios({
      url: link,
      method: 'POST',
      headers,
      data: body,
      transformRequest: [(data) => {
        return JSON.stringify(data);
      }],
      // proxy: {
      //   host: '127.0.0.1',
      //   port: 8888,
      // },
    });

    if (res.status === 200) {
      return res.data.data;
    }

    throw new Error(`Wrong Code: ${res.status}`);
  } catch (err) {
    throw err;
  }
}

class Geektime {
  constructor(country, cellphone, password) {
    this.cookie = 'xxx';
  }

  // 产品列表，返回 专栏/视频课/微课/其他
  async products() {
    const cookie = await this.getCookie();

    const res = await request(links.products, null, cookie);

    // only return 10, we need more!
    const parts = res.filter(v => v.page.more);
    const fulls = await Promise.all(
      parts.map(v => request(
        links.productList, { nav_id: v.id, prev: 0, size: 100 }, cookie,
      )),
    );
    fulls.forEach((v, index) => {
      res.find(m => parts[index].id === m.id).list = v.list;
    });

    return res;
  }

  // 专栏介绍
  async intro(cid) {
    const cookie = await this.getCookie();

    return request(links.intro, { cid }, cookie);
  }

  // 专栏文章列表
  async articles(cid, size = 1000) {
    const cookie = await this.getCookie();

    return request(links.articles, { cid, size }, cookie);
  }

  // 单篇文章详情
  async article(id) {
    const cookie = await this.getCookie();

    return request(links.article, { id }, cookie);
  }

  // 文章评论
  async comments(aid, size = 200, prev = 0) {
    const cookie = await this.getCookie();

    return request(links.comments, { aid, size, prev }, cookie);
  }

  // 音频列表
  async audios(cid, size = 1000) {
    const cookie = await this.getCookie();

    return request(links.audios, { cid, size }, cookie);
  }

  async getCookie() {
    if (this.cookie) {
      return this.cookie;
    }

    throw new Error('Please set cookie first');
  }
}

module.exports = Geektime;
