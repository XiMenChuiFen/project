// pages/my/my.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[
      {
        "name":"关于",
        "leftIcon": "../../images/sigin_icon@3x.png",
        "rightIcon":"../../images/nav_back_h@3x.png",
      }
    ],
    userData:{},
    user:true,
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
    this.getUserData();
    // this.getUserCount();
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
  getUserData(){
    // console.log(wx.getStorageSync("userData"));
    let user=false;
    if (wx.getStorageSync("userData")==""){
      user = true;
    }else{
      this.getUserCount();
    }
    this.setData({
      userData: wx.getStorageSync("userData"),
      user: user
    })
  },
  getUserCount(){
    let this_=this;
    db.collection('AccountBook_UserCount').where({
      "_openid": wx.getStorageSync("id"),
    }).get({
      success(res) {
        console.log(res.data);
        this_.setData({
          count: res.data[0],
        })
      }
    })
  }
})