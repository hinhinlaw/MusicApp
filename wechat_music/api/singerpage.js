var { url } = require('./config.js');

function getSingerProfile(id, callback) {
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

//获取歌手专辑
function getSingerAlbum(id,callback){
  wx:wx.request({
    url: `${url}/artist/album`,
    data: {id,limit:25},
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

module.exports.getSingerProfile = getSingerProfile;
module.exports.getSingerAlbum = getSingerAlbum;