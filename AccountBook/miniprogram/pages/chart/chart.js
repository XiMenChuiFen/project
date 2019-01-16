// pages/chart/chart.js
const db = wx.cloud.database()
const _ = db.command
const CONFIG = require('../../config.js');
const Time = require('../../utils/time.js');
//获取本周日期

var timeArray = [];
const dateOfToday = Date.now()
const dayOfToday = (new Date().getDay() + 7 - 1) % 7
const daysOfThisWeek = Array.from(new Array(7))
  .map((_, i) => {
    const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
    let t = date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0')
    timeArray.push({
      "day": String(date.getDate()).padStart(2, '0'),
      "time": t
    })
  })
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: CONFIG,
    selectTabType:0, // 0支出 1收入
    selectTime:0,//0周
    rankingList:[],
    mTime: timeArray,  // 周天数和数据,
    today: Time.default.y + "-" + Time.default.m + "-" + Time.default.d,  //今天
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
    // wx.showLoading({
    //   title: '加载中',
    // })
    this.setData({
      today: Time.default.y + "-" + Time.default.m + "-" + Time.default.d,  //今天
      selectTabType:0,
    })
    this.getToday(Time.default.y + "-" + Time.default.m + "-" + Time.default.d, this.data.selectTime);
    this.getWekData()
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
  selectTabType(e){  //选择支出0或收入1
    console.log( e.currentTarget.dataset.index,this.data.today)
    this.getToday(this.data.today, Number(e.currentTarget.dataset.index))
    this.setData({
      selectTabType: e.currentTarget.dataset.index
    })
  },
  selectTime(e){//选择时间 周0 月1 年2
    this.setData({
      selectTime: e.currentTarget.dataset.time
    })
  },
  getToday(time,type){ //今天排行榜数据
    // console.log(time, type)
    let this_=this;
    db.collection('AccountBook_DayRecord').where({
      time:time,
      currentType: type,
      _openid: wx.getStorageSync("id")
    }).orderBy('money', 'desc').limit(10).get({
      success(res) {
          this_.setData({
            rankingList: res.data
          })
        
        console.log(this_.data.rankingList);
      },
      fail(res){
        wx.showToast({
          title: '好像网络出现问题哦',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },

  getWekData(){ //获取一周的每天花费
    // console.log(timeArray)
    let this_=this;
    db.collection('AccountBook_DayCount').where({
      time: _.eq(timeArray[0].time).or(_.eq(timeArray[1].time)).or(_.eq(timeArray[2].time)).or(_.eq(timeArray[3].time)).or(_.eq(timeArray[4].time)).or(_.eq(timeArray[5].time)).or(_.eq(timeArray[6].time)),
      _openid: wx.getStorageSync("id"),
    }).orderBy('time', 'asc').limit(12).get({
      success(res) {
        console.log(res.data,"获取一周的每天花费");
        this_.setData({
          mTime: this_.wekData(timeArray, res.data),
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
  },
  wekData(time,data){
    // console.log(time, data);
    let dayData = time;
    for(let i=0;i<7;i++){

      for (let j = 0; j < data.length; j++){
        if (data[j].time == dayData[i].time){
          dayData[i].income = data[j].income;
          dayData[i].pay = data[j].pay;
        } else if (dayData[i].pay==undefined){
          dayData[i].income = 0;
          dayData[i].pay = 0;
        }
      }
    }
    console.log(dayData,'排榜好的数据')
    wx.setStorageSync("chartList", dayData)
    return dayData;
  },
  clickChartList(e){  //监控点击图表列 更新排行榜
    this.setData({
      today: e.detail.time
    })
    this.getToday(e.detail.time, e.detail.type)
  }
})