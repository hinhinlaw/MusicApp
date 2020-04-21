//引入api文件
var searchApi = require('../../api/search.js');
//函数防抖
var {debounce} = require('../../tools/tools');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    show: false,
    inputDebounce: null
  },

  //获取input输入值
  search(ev){
    // console.log(arg);
    let _this = this;
    let keywords = ev.detail.value;
    let res = []
    let songnameAndSinger = []
    // let songList = [];
    if(keywords){
      searchApi.getSearchUrl(keywords, (data) => {
        res = data.data.result.songs.slice(0, 20);
        // console.log(res);
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
  onSearch(ev) {
    // console.log(ev);
    // 函数防抖
    this.inputDebounce(ev);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用一个变量接收debounce方法return出来的函数，如果在onSearch中直接调用debounce，则每次都创建一个闭包，每次都return一个新的函数出来，就起不到防抖的作用了。
    //假如触发了三次onSearch()方法，则return了三个function出来，每个function都clearTimeout之后执行setTimeout，所以就会执行三次search()方法，起不到防抖作用
    this.inputDebounce = debounce(this.search,300);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
      songList: [],
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