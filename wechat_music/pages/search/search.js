//引入api文件
var searchApi = require('../../api/search.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:[],
    show: false
  },

  //获取input输入值
  search(ev){
    let _this = this;
    let keywords = ev.detail.value;
    let res = []
    let songnameAndSinger = []
    // let songList = [];
    if(keywords){
      searchApi.getSearchUrl(keywords, (data) => {
        res = data.data.result.songs.slice(0, 20);
        console.log(res);
        res.forEach(item => {
          let obj = {};
          obj.songName = item.name;
          obj.singer = item.artists[0].name;
          obj.id = item.id;
          songnameAndSinger.push(obj);
        })
        // console.log(songnameAndSinger);
        _this.setData({
          songList: songnameAndSinger,
          show:true
        })
        // console.log(_this.data.songList);
      })
    }else{
      this.setData({
        songList:[],
        show:false
      })
      return;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      songList: [],
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      songList:[],
      show: false
    })
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