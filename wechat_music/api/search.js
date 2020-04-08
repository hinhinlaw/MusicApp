var { url } = require('./config.js');

//搜索接口
function getSearchUrl(keywords,callback) {
  wx: wx.request({
    url: `${url}/search`,
    data: { keywords: keywords, type:1 },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      callback(res);
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

module.exports.getSearchUrl = getSearchUrl;