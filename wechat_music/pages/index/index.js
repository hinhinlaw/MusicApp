//引入api文件
var indexApi = require('../../api/index.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    msg: [{
        img: "https://y.gtimg.cn/music/common/upload/category_area/2165997.jpg",
        text: "综艺专区"
      },
      {
        img: "https://y.gtimg.cn/music/common/upload/category_area/2173224.png",
        text: "轻音乐专区"
      },
      {
        img: "https://y.gtimg.cn/music/common/upload/category_area/2156073.jpg",
        text: "经典专区"
      },
      {
        img: "https://y.gtimg.cn/music/common/upload/category_area/2159847.jpg",
        text: "电音专区"
      },
      {
        img: "https://y.gtimg.cn/music/common/upload/category_area/2168958.jpg",
        text: "影视专区"
      }
    ],
    // hotSongList: [],
    // {
    //   img: "http://p4.music.126.net/rd0iSV6zxXOytgehfIaZ8g==/109951163693273653.jpg?param=200y200",
    //   text: "最-陈奕迅"
    // },
    // {
    //   img: "http://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q3fDiawWkhTTVWgGNM52HBNA/300?n=1",
    //   text: "欧美| 流行节奏控"
    // },
    // {
    //   img: "http://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q4X4NiaWS01Fvtn063nqHY2Q/300?n=1",
    //   text: "欧美| 流行轻有氧"
    // },
    // {
    //   img: "http://qpic.y.qq.com/music_cover/4pmnRu5sL5QbtO8OS8NKJfZrk8BAWrrpjoXd2UIvyBMlQpiaQpf8MaQ/300?n=1",
    //   text: "最·SUPERJUNIOR"
    // },
    // {
    //   img: "http://qpic.y.qq.com/music_cover/7vlTTvwBiaibKJpyXffTHicMpDXK5xPJiaPoPSy3PBexF9zRK9veKIXuxw/300?n=1",
    //   text: "古典| 美妙心情"
    // },
    // {
    //   img: "http://qpic.y.qq.com/music_cover/7vlTTvwBiaibKJpyXffTHicMpDXK5xPJiaPobp8KZDDeCVsjiaePJqnMzXA/300?n=1",
    //   text: "欧美| 情绪激活"
    // }
    // ],
    // songRecommend: [],
    // {
    //     img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000003bhHTa4MG3op_1.jpg?max_age=2592000",
    //     songName: "王妃 ＋ 因为爱所以爱 ＋ 流星",
    //     singer: "萧敬腾"
    //   },
    //   {
    //     img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000003Y6RQh4PjlLP_1.jpg?max_age=2592000",
    //     songName: "银河修理员",
    //     singer: "Dear Jane"
    //   },
    //   {
    //     img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000002QsbCG1QUfnO_1.jpg?max_age=2592000",
    //     songName: "字典与圣经",
    //     singer: "麦浚龙 / 林嘉欣"
    //   },
    //   {
    //     img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000000Vv8741FJEGp_1.jpg?max_age=2592000",
    //     songName: "悬日",
    //     singer: "田馥甄"
    //   }
    // ],
    // hotList: [{
    //     img: "https://y.gtimg.cn/music/photo_new/T003R300x300M000001z6qaR0lZsYx.jpg?max_age=2592000",
    //     title: "飙升榜",
    //     no1: "少年-梦然",
    //     no2: "口是心非-杨小壮/鹏鹏",
    //     no3: "223's(feat.9loknine)-YNW Melly"
    //   },
    //   {
    //     img: "https://y.gtimg.cn/music/photo_new/T003R300x300M00000258Ch13SIJS1.jpg?max_age=2592000",
    //     title: "热歌榜",
    //     no1: "少年-梦然",
    //     no2: "红色高跟鞋-蔡健雅",
    //     no3: "麻雀-李荣浩"
    //   },
    //   {
    //     img: "https://y.gtimg.cn/music/photo_new/T003R300x300M000000LN0up1FfsJF.jpg?max_age=2592000",
    //     title: "新歌榜",
    //     no1: "一生回味一面-DJ小鱼儿",
    //     no2: "等着等着就老了-李荣浩",
    //     no3: "昙花一现雨及时-周深/郑云龙"
    //   }
    // ],
    hotList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //请求歌单详情
    let _this = this;
    //请求热门歌单
    indexApi.getHighQualitySongList((res) => {
      // console.log(res)
      let songLists = res.data.playlists
      // let songLists = res.data.playlists.slice(0, 6);
      _this.setData({
        hotSongList: songLists
      })
      // console.log(this.data.hotSongList);
    })
    let songs = [];

    //获取歌曲详情
    indexApi.getSongProfile(28940048, (res) => {
      // console.log(res)
      let obj = {}
      obj.songName = res.data.songs[0].name;
      obj.singer = res.data.songs[0].ar[0].name;
      obj.img = res.data.songs[0].al.picUrl;
      obj.id = res.data.songs[0].id;
      songs.push(obj)
      _this.setData({
        songRecommend: songs
      })
    })
    indexApi.getSongProfile(27483203, (res) => {
        // console.log(res)
        let obj = {}
        obj.songName = res.data.songs[0].name;
        obj.singer = res.data.songs[0].ar[0].name;
        obj.img = res.data.songs[0].al.picUrl;
        obj.id = res.data.songs[0].id;
        songs.push(obj)
        _this.setData({
          songRecommend: songs
        })
      }),
      indexApi.getSongProfile(407927304, (res) => {
        // console.log(res)
        let obj = {}
        obj.songName = res.data.songs[0].name;
        obj.singer = res.data.songs[0].ar[0].name;
        obj.img = res.data.songs[0].al.picUrl;
        obj.id = res.data.songs[0].id;
        songs.push(obj)
        _this.setData({
          songRecommend: songs
        })
      })
    indexApi.getSongProfile(469508217, (res) => {
      // console.log(res)
      let obj = {}
      obj.songName = res.data.songs[0].name;
      obj.singer = res.data.songs[0].ar[0].name;
      obj.img = res.data.songs[0].al.picUrl;
      obj.id = res.data.songs[0].id;
      songs.push(obj)
      _this.setData({
        songRecommend: songs
      })
      // console.log(_this.data);
      // console.log(this.data.songRecommend);
    })
    let list = [];
    //获取飙升榜
    indexApi.getRank(3, (res) => {
      // console.log(res);
      let obj = {}
      obj.img = res.data.playlist.coverImgUrl;
      obj.title = res.data.playlist.name;
      obj.no1 = res.data.playlist.tracks[0].name;
      obj.no2 = res.data.playlist.tracks[1].name;
      obj.no3 = res.data.playlist.tracks[2].name;
      obj.no1Id = res.data.playlist.tracks[0].id;
      obj.no2Id = res.data.playlist.tracks[1].id;
      obj.no3Id = res.data.playlist.tracks[2].id;
      // console.log(obj)
      list.push(obj);
      _this.setData({
        hotList: list
      })
    })
    //获取热歌榜
    indexApi.getRank(1, (res) => {
      // console.log(res);
      let obj = {}
      obj.img = res.data.playlist.coverImgUrl;
      obj.title = res.data.playlist.name;
      obj.no1 = res.data.playlist.tracks[0].name;
      obj.no2 = res.data.playlist.tracks[1].name;
      obj.no3 = res.data.playlist.tracks[2].name;
      obj.no1Id = res.data.playlist.tracks[0].id;
      obj.no2Id = res.data.playlist.tracks[1].id;
      obj.no3Id = res.data.playlist.tracks[2].id;
      list.push(obj);
      _this.setData({
        hotList: list
      })
    })
    //获取新歌榜
    indexApi.getRank(0, (res) => {
      // console.log(res);
      let obj = {}
      obj.img = res.data.playlist.coverImgUrl;
      obj.title = res.data.playlist.name;
      obj.no1 = res.data.playlist.tracks[0].name;
      obj.no2 = res.data.playlist.tracks[1].name;
      obj.no3 = res.data.playlist.tracks[2].name;
      obj.no1Id = res.data.playlist.tracks[0].id;
      obj.no2Id = res.data.playlist.tracks[1].id;
      obj.no3Id = res.data.playlist.tracks[2].id;
      list.push(obj);
      _this.setData({
        hotList: list
      })
      // console.log(_this.data.hotList)
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
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        // this.setData()页面数据同步
        _this.setData({
          screenWidth: (res.windowWidth) * 0.9
        })
      }
    })
    // console.log(this.data.hotSongList)

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