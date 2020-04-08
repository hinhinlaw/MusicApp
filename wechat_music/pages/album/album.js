var albumApi = require('../../api/album.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let arr = [];
    let num = 0;
    // console.log(options)
    //获取歌单详情
    setTimeout(() => {
      albumApi.getSongListProfile(options.id, (res) => {
        console.log(res);
        _this.setData({
          coverImgUrl: res.data.album.picUrl,//封面
          listName: res.data.album.name,//专辑名
          icon: res.data.album.artist.picUrl,//歌手icon
          nickName:res.data.album.artist.name,
          songList: res.data.songs
        })
        console.log(this.data.songList)
      })
    }, 200)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})