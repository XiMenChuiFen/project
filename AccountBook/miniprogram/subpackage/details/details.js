// miniprogram/subpackage/details/details.js
const CONFIG = require('../../config.js');
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      config: CONFIG,
      list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      list:options
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

  },
  //删除记录
  delect(e){
    console.log(e.currentTarget.dataset.id, wx.getStorageSync("id"))
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除',
      content: '只删除记录,金额统计不受影响',
      cancelColor:'#969696',
      confirmColor:'#343233',
      success(res) {
        if (res.confirm) {
            console.log('用户点击确定');
          db.collection('AccountBook_DayRecord').doc(id).update({
            data: {
              //0 为删除 1删除
              "delectType": 1
            },
            success: (e)=>{
              // console.log(e);
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000,
                success:()=>{
                  setTimeout(()=>{
                    wx.switchTab({
                      url: "../../pages/index/index"
                    })
                  },1500)
                }
              })
            },  
            fail: (e) => {
              console.log(e);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})