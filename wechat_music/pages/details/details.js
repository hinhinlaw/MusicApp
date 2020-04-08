// pages/details/details.js
var detailsApi = require('../../api/deteils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    play: false,
    audioContext: null, //audio对象
    songUrl: '', //歌曲url
    songLyric: '', //歌词(带时间点)
    pureLyric: [], //纯歌词
    pureTime: [], //歌词对应的时间
    songName: '', //歌名
    singer: '', //歌手
    singerId: '', //歌手id
    singerIcon: '', //歌手头像
    album: '', //专辑名
    albumId: '', //专辑id
    albumIcon: '', //专辑封面
    poster: '', //封面
    collect: false, //是否收藏
    like: false, //评论点赞
    currentIndex: 0, //控制歌词滚动
    marginTop: 0, //控制歌词滚动
    timer: null,
    songRecommend: [, //歌曲推荐
      {
        img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000003bhHTa4MG3op_1.jpg?max_age=2592000",
        songName: "王妃 ＋ 因为爱所以爱 ＋ 流星",
        singer: "萧敬腾",
      },
      {
        img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000003Y6RQh4PjlLP_1.jpg?max_age=2592000",
        songName: "银河修理员",
        singer: "Dear Jane",
      },
      {
        img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000002QsbCG1QUfnO_1.jpg?max_age=2592000",
        songName: "字典与圣经",
        singer: "麦浚龙 / 林嘉欣",
      },
      {
        img: "https://y.gtimg.cn/music/photo_new/T002R90x90M000000Vv8741FJEGp_1.jpg?max_age=2592000",
        songName: "悬日",
        singer: "田馥甄",
      }
    ],
    //评论
    recommend: [{
        icon: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=39374649,1825503556&fm=26&gp=0.jpg",
        name: "麦浚龙",
        monthTime: "03-15",
        particularTime: "17:12",
        like: "10",
        content: "Hello,大家好，我是Juno麦浚龙"
      },
      {
        icon: "https://bkimg.cdn.bcebos.com/pic/00e93901213fb80e20234d883cd12f2eb83894fa?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U5Mg==,xp_5,yp_5",
        name: "林嘉欣",
        monthTime: "03-15",
        particularTime: "18:32",
        like: "5",
        content: "Hello,大家好，我是林嘉欣"
      }
    ]
  },

  //收藏功能
  toggleCollect() {
    if (this.data.collect) {
      this.setData({
        collect: false
      })
    } else {
      this.setData({
        collect: true
      })
    }
  },

  //评论点赞
  toggleLike() {
    if (this.data.like) {
      this.setData({
        like: false
      })
    } else {
      this.setData({
        like: true
      })
    }
  },

  //播放/暂停歌曲
  playOrPause() {
    let _this = this;
    if (this.data.play == true) {
      this.setData({
        play: false
      })
      //暂停
      this.data.audioContext.pause();
    } else {
      this.setData({
        play: true
      })
      //播放
      // console.log(this.data.songUrl)
      this.data.audioContext.play();
      this.data.audioContext.onTimeUpdate(() => {
        // console.log(_this.data.audioContext.currentTime);
        //播放完歌曲显示“播放”图标
        if (_this.data.audioContext.currentTime == _this.data.audioContext.duration) {
          _this.setData({
            play: false
          });
        }
        //歌词联动
        // console.log(_this.data.pureTime[0])
        if (_this.data.pureTime[0][_this.data.currentIndex + 1] < _this.data.audioContext.currentTime) {
          // console.log('1')
          // console.log(_this.data.pureLyric)
          // console.log(_this.data.pureLyric[_this.data.currentIndex+1].length)
          // if (_this.data.pureLyric[_this.data.currentIndex + 1].length > 18) {
          //   _this.setData({
          //     marginTop: _this.data.marginTop + 40,
          //     currentIndex: _this.data.currentIndex + 1
          //   })
          // } else {
          _this.setData({
            marginTop: _this.data.marginTop + 32,
            currentIndex: _this.data.currentIndex + 1
          })
          // }
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let songId = options.id; //获取传过来的歌曲id
    // console.log(songId);

    //获取歌曲url
    new Promise((resolve, reject) => {
      detailsApi.getSongUrl(songId, (res) => {
        _this.setData({
          songUrl: res.data.data[0].url
        })
        resolve(res.data.data[0].url);
      })
    }).then((url) => {
      //请求到歌曲url之后创建InnerAudioContext对象并设置src值
      let audioContext = wx.createInnerAudioContext(); //创建InnerAudioContext对象
      // console.log(this.data.songUrl)
      audioContext.src = url;
      _this.setData({
        audioContext
      })
      // console.log(audioContext.src)
    })



    //获取歌词
    detailsApi.getSongLyric(songId, (res) => {
      _this.setData({
        songLyric: res.data.lrc.lyric
      })
      // _this.data.songLyric = _this.data.songLyric
      let arr = _this.data.songLyric;
      let finalArr = []; //分割成数组
      let pureLyric = []; //纯歌词
      let pureTime = []; //歌词对应的时间
      //第一次分割字符串
      arr = arr.split('[')
      // console.log(arr);
      //第二次分割字符串
      for (let i = 0; i < arr.length; i++) {
        finalArr.push(arr[i].split(']'));
      }
      finalArr.splice(0, 1);
      let totalTimeArr = [] //转换格式后的歌词对应的时间的数组
      finalArr.forEach(item => {
        let timeArr = item[0].split(':');
        let minute = timeArr[0] * 60;
        let seconds = timeArr[1] * 1;
        let totalTime = minute + seconds;
        totalTimeArr.push(totalTime);
      })
      pureTime.push(totalTimeArr)
      for (let i = 0; i < finalArr.length; i++) {
        pureLyric.push(finalArr[i][1])
      }
      _this.setData({
        pureLyric,
        pureTime
      })
      // console.log(_this.data.pureTime);
    })

    //获取歌曲详情
    new Promise((resolve, reject) => {
      detailsApi.getSongProfile(songId, (res) => {
        console.log(res);
        let name = res.data.songs[0].ar[0].name;
        if (res.data.songs[0].ar.length > 1) {
          for (let i = 1; i < res.data.songs[0].ar.length; i++) {
            name += '/' + res.data.songs[0].ar[i].name
          }
        }
        _this.setData({
          songName: res.data.songs[0].name,
          singer: name,
          singerId: res.data.songs[0].ar[0].id,
          album: res.data.songs[0].al.name,
          albumId: res.data.songs[0].al.id,
          albumIcon: res.data.songs[0].al.picUrl,
          poster: res.data.songs[0].al.picUrl
        })
        resolve(res.data.songs[0].ar[0].id);
      })
    }).then((id) => {
      //获取歌手详情
      detailsApi.getSingerIcon(id, (res) => {
        // console.log(res)
        _this.setData({
          singerIcon: res.data.artist.img1v1Url
        })
      })
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
    this.data.audioContext.stop();
    this.setData({
      play: false
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