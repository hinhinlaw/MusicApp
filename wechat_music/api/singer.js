var { url } = require('./config.js');

//获取歌手列表
function getSingerList(cat,callback){
  wx:wx.request({
    url: `${url}/artist/list`,
    data: {cat},
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      callback(res);
    },
    fail: function(res) {},
    complete: function(res) {},
  })
}

module.exports.getSingerList = getSingerList;