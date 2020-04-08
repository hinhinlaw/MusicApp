var singerApi = require('../../api/singer.js');

// pages/singer/singer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conId: 0, //默认第一项
    category: ["华语男歌手", "华语女歌手", "华语组合", "欧美男歌手", "欧美女歌手", "欧美组合", "日本男歌手", "日本女歌手", "日本组合", "韩国男歌手", "韩国女歌手", "韩国组合", "其他男歌手", "其他女歌手", "其他组合"],
    categoryItem: ["1001", "1002", "1003", "2001", "2002", "2003", "6001", "6002", "6003", "7001", "7002", "7003", "4001", "4002","4003"]
  },

  itemclick(event){
    var id = event.target.dataset.id;
    this.setData({
      conId: id
    })
    singerApi.getSingerList(this.data.categoryItem[this.data.conId], (res) => {
      console.log(res);
      this.setData({
        singer: res.data.artists.slice(0, 10)
      })
      console.log(this.data.hotSongList)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    singerApi.getSingerList(this.data.categoryItem[this.data.conId], (res) => {
      this.setData({
        singer: res.data.artists.slice(0,10)
      })
      console.log(this.data.singer)
    })
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
    //获取屏幕高度
    var _this = this;
    wx.getSystemInfo({
      success(res) {
        //this.setData()页面数据同步
        _this.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
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