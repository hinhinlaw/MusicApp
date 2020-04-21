// pages/category/category.js
var categoryApi = require('../../api/category.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    conId: 0, //默认第一项
    hotSongList:[],
    categoryItem:["华语","欧美","日语","韩语","粤语","流行", "摇滚", "民谣", "电子", "说唱", "轻音乐", "爵士","乡村","古典"]
  },


  itemclick(event) {
    // console.log(event);
    //获取触发对象中data每个id数据
    var id = event.target.dataset.id;
    this.setData({
      conId: id
    })
    //点击左侧tab时才请求数据
    categoryApi.getSongList(this.data.categoryItem[this.data.conId], (res) => {
      // console.log(res);
      this.setData({
        hotSongList: res.data.playlists
      })
      // console.log(this.data.hotSongList)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    categoryApi.getSongList(this.data.categoryItem[this.data.conId],(res)=>{
      // console.log(res);
      this.setData({
        hotSongList:res.data.playlists
      })
      // console.log(this.data.hotSongList)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})