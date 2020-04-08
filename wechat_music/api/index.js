var {url} = require('./config.js');

//请求歌单详情
function getSongListProfile(callback){
  wx.request({
    url: `${url}/playlist/detail`,
    data: { id: 3865036},
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

//获取精品歌单
function getHighQualitySongList(callback){
  wx.request({
    url: `${url}/top/playlist/highquality`,
    data:{cat:'华语'},
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

//获取歌曲详情
function getSongProfile(id,callback){
  wx.request({
    url: `${url}/song/detail`,
    data:{ids: id},
    // data: {id},
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

//获取排行榜
function getRank(idx,callback){
  wx.request({
    url: `${url}/top/list`,
    data:{idx: idx},
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
module.exports.getHighQualitySongList = getHighQualitySongList;
module.exports.getSongProfile = getSongProfile;
module.exports.getRank = getRank;