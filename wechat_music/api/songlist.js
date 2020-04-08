var { url } = require('./config.js');

//请求歌单详情
function getSongListProfile(id,callback) {
  wx.request({
    url: `${url}/playlist/detail`,
    data: { id },
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

module.exports.getSongListProfile = getSongListProfile;