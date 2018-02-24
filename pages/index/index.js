//index.js
//获取应用实例
const app = getApp()
const api = require('../../api/index.js')
// const backgroundAudioManager = wx.getBackgroundAudioManager()
// backgroundAudioManager.src = 'http://owaup0bqu.bkt.clouddn.com/wangfei.mp3'
const TEXT = '祝您狗年元宵节快乐！'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isGet:false,
    isPlaying:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dog: '\ud83d\udc36'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  switchPlayState() {
    let isPlay = this.data.isPlaying
   
    if (isPlay) {
      this.audioCtx.pause()
      this.setData({
        isPlaying: false
      })
    }else{
      this.audioCtx.play()
      this.setData({
        isPlaying: true
      })
    }
    
  },
  onShow() {
    if(this.audioCtx) {
      this.audioCtx.play()
    }
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.setBarTitle()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.setBarTitle()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    let detail = e.detail
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: detail.userInfo,
      hasUserInfo: true,
      isGet:true
    })
    this.setBarTitle()
    this.pageScroll()
    let iv = detail.iv
    let encryptedData = detail.encryptedData
    this._postUserInfo(iv, encryptedData)
  },
  _postUserInfo(iv, encryptedData) {
    let code = app.globalData.code
    api.postUserInfo(code, iv, encryptedData).then((res) => {
      console.log(res)
    })
  },
  setBarTitle() {
    let pageTitle = this.data.userInfo.nickName + TEXT
    wx.setNavigationBarTitle({
      title: pageTitle
    })
  },
  pageScroll() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  goToHndt() {
    wx.navigateToMiniProgram({
      appId: 'wx9734f6e462251a8f',
      path: "pages/index/index",
      success(res) {
        // 打开成功
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.from)
    }
    return {
      title: this.data.userInfo.nickName + '祝您狗年元宵节快乐！',
      path: "pages/index/index",
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
