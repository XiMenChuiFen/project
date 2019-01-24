// subpackage/binduser/binduser.js
var server = require('../../utils/server.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  binduser(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    wx.request({
      url: `${server.default.ServerUrl}phz/WeixinStar/bindUser.php`, //自己服务器登录php
      method: 'POST',
      data: {
        name: e.detail.value.name,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res, '---绑定返回');
        if (res.data.number==200){
         
          let obj = {
            "key": res.data.key,
            "name": res.data.data.name,
            "face": res.data.data.face_url,
            "id": res.data.data.id
          }
          wx.setStorageSync('user', obj);
          setTimeout(function(){
            wx.hideLoading();
            wx.redirectTo({
              url: '../../subpackage/result/result?name=' + res.data.data.name
            })
          },500)
        }else{
          wx.showToast({
            title: res.data.mes ,
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  }
})