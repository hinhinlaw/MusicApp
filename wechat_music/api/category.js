var { url } = require('./config.js');

//请求歌单
function getSongList(cat,callback){
  wx:wx.request({
    url: `${url}/top/playlist/highquality`,
    data: {cat},
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      callback(res)
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

module.exports.getSongList = getSongList;