// pages/songlist/songlist.js
var songlistApi = require("../../api/songlist.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    numArr:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let arr= [];
    let num= 0;
    // console.log(options)
    //获取歌单详情
    setTimeout(()=>{
      songlistApi.getSongListProfile(options.id, (res) => {
        // console.log(res);
        _this.setData({
          coverImgUrl: res.data.playlist.coverImgUrl,//封面
          listName: res.data.playlist.name,//用户名
          icon: res.data.playlist.creator.avatarUrl,//用户icon
          nickName: res.data.playlist.creator.nickname,//用户名
          description: res.data.playlist.description,//简介
          songList: res.data.playlist.tracks.slice(0, 20)
        })
      })
    },200)
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