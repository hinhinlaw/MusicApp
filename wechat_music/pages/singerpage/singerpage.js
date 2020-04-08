var singerpageApi = require('../../api/singerpage.js');
// pages/singerpage/singerpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singerName:'',//歌手名
    singerIcon:'',//歌手icon
    songList:[],//歌手歌曲列表
    singerBriefDescription:'',//歌手简介
    singerAlbum:[],//歌手专辑
    active:0
  },

  //点击切换到歌曲/专辑
  toSongList(){
    this.setData({
      active:0
    })
  },
  toAlbumList(){
  let _this = this
    // 获取歌手专辑
    singerpageApi.getSingerAlbum(this.data.id, (res) => {
      // console.log(res);
      _this.setData({
        singerAlbum: res.data.hotAlbums
      })
      // console.log(_this.data.singerAlbum);
    })
    this.setData({
      active:1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    this.setData({
      id:options.id
    })
    // 获取歌手信息
    singerpageApi.getSingerProfile(options.id,(res)=>{
      // console.log(res);
      _this.setData({
        singerName: res.data.artist.name,
        singerIcon: res.data.artist.img1v1Url,
        songList: res.data.hotSongs,
        singerBriefDescription:res.data.artist.briefDesc
      })
      // console.log(this.data.songList)
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