// pages/home/home.js
const CONFIG = require('../../config.js');
const db = wx.cloud.database();
const Time = require('../../utils/time.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: CONFIG,
    dateTime: Time.default.y + "-" + Time.default.m,
    year: Time.default.y,
    month: Time.default.m,
    lists:[],//已经排版数据
    listsCount:[],//统计 
    listsLength:1,
    selectTime:'',//选中日期

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDaily(this.data.dateTime);
    
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
    wx.showTabBar({
      animation:true
    })
    this.setData({
      dateTime: Time.default.y + "-" + Time.default.m,
      year: Time.default.y,
      month: Time.default.m,
      listsLength: 1,
      selectTime: '',//选中日期
    })
    this.onGetOpenid();
    // this.getDaily(this.data.dateTime);
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
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.setStorageSync("id", res.result.openid)
        this.getDaily(this.data.dateTime, res.result.openid);

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  timeChange(e){
    // console.log(e.detail.value)
    wx.showLoading({
      title: '加载中',
    })
    let selectTime = e.detail.value.split('-');
    this.getDaily(e.detail.value,wx.getStorageSync("id"));
    this.setData({
      year: selectTime[0],
      month: selectTime[1],
      selectTime: e.detail.value
    })
  },

  getDaily(yymm,id){

    wx.cloud.callFunction({//云函 获取月的所有记录
      name: 'accountBook', 
      data: {
        time: yymm,
        id: id
      },
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.data);
        this.listFilter(res.result.data);
        wx.hideLoading();
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
        wx.showToast({
          title: '好像网络出现问题哦',
          icon: 'none',
          duration: 2000
        })
      }
    });

  },


  listFilter(lists){ //数据结构排版
    let listObj={};
    let listArray=[];
    let listObjCount={};
    let listsCount=[]
    for (let i = 0; i < lists.length;i++){
      var list = lists[i];
      if (!listObj[list.time] && list.delectType==0) {
        listArray.push({
          time: list.time,
          data: [list]
        });
        listObj[list.time] = list;
      }else{
        for (var j = 0; j < listArray.length; j++){
          var listData = listArray[j];
          if (listData.time == list.time && list.delectType == 0){
              listData.data.unshift(list);
              break;
            }
        }
      }

      if (!listObjCount[list.time] ) {
        listsCount.push({
          time: list.time,
          data: [list]
        });
        listObjCount[list.time] = list;
      } else {
        for (var j = 0; j < listsCount.length; j++) {
          var listDataCount = listsCount[j];
          if (listDataCount.time == list.time) {
            listDataCount.data.unshift(list);
            break;
          }
        }
      }

    }
    this.setData({
      lists: listArray,
      listsLength: listArray.length,
      listsCount: listsCount
    })
    console.log(listArray, this.data.listsCount)

  }

})