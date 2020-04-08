var { url } = require('./config.js');

//请求歌曲url
function getSongUrl(songId,callback){
  wx.request({
    url: `${url}/song/url`,
    data: {
      id: songId
    },
    success(res) {
      callback(res)
    }
  })
}
//请求歌曲歌词
function getSongLyric(songId,callback){
  wx.request({
    url: `${url}/lyric`,
    data: {
      id: songId
    },
    success(res) {
      // console.log(res)
     callback(res);
    }
  })
}

//获取歌曲详情(歌名、歌手、poster)
function getSongProfile(id, callback) {
  wx.request({
    url: `${url}/song/detail`,
    data: { ids: id },
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

//获取歌手详情
function getSingerProfile(id,callback){
  wx.request({
    url: `${url}/artist/desc`,
    data: { id: id },
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

//获取歌手头像
function getSingerIcon(id,callback){
  wx.request({
    url: `${url}/artists`,
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

module.exports.getSongUrl = getSongUrl;
module.exports.getSongLyric = getSongLyric;
module.exports.getSongProfile = getSongProfile;
module.exports.getSingerProfile = getSingerProfile;
module.exports.getSingerIcon = getSingerIcon;