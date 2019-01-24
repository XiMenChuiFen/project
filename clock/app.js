//app.js
const server = require('utils/server.js');
// var QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
// // 实例化API核心类
// var qqmapsdk = new QQMapWX({
//   key: 'WZ4BZ-SPICQ-M265N-GB6VX-SHKK2-6GBN6' // 必填
// });
// console.log(server)
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `${ server.default.ServerUrl }phz/WeixinStar/loginOpenId.php`, //自己服务器登录php
            method: 'GET',
            data: {
              code: res.code,
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res)=> {
              var obj = JSON.parse(res.data)
              this.globalData.userInfo=obj
              console.log(this.globalData.userInfo,'---app.js')
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
})