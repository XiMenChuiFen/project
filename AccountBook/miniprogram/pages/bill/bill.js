// pages/bill/bill.js
const db = wx.cloud.database()
const Time = require('../../utils/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    dateTime: Time.default.y + "-" + "01-01",//Time.default.y
    selectTime: Time.default.y,
    noData:-1,
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
    this.setData({
      // lists: [],
      dateTime: Time.default.y + "-" + "01-01",//Time.default.y
      selectTime: Time.default.y,
      noData: -1,
    })
    this.getData(Time.default.y)
    console.log(Time.default.y)
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
  timeChange(e){//时间选择
    console.log(e.detail.value);
    this.getData(e.detail.value)
    this.setData({
      selectTime: e.detail.value,
      dateTime: e.detail.value+"-" + "01-01"
    })
  },
  getData(e){
    let this_ = this;
    console.log(e.toString())
    db.collection('AccountBook_MonthCount').where({
      time: db.RegExp({
        regexp: e.toString(),
        options: 'm',
      }),
      _openid: wx.getStorageSync("id"),

    }).orderBy('time', 'asc').limit(12).get({
      success(res) {
        console.log(res.data);
        this_.setData({
          lists: res.data,
          noData: res.data.length
        })
        wx.hideLoading();
      },
      fail(res) {
        wx.showToast({
          title: '好像网络出现问题哦',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

})