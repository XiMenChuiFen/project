// subpackage/result/result.js
const AUTH_MODE = 'fingerPrint';
var server = require('../../utils/server.js');
var times=new Date();
var hours = times.getHours();
var minutes = times.getMinutes()
var year = times.getFullYear();
var month = times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1;
var day = times.getDate()< 10 ? '0' + (times.getDate()) : times.getDate();
var ymd = year+"-"+month+"-"+day
var userName;
var storage;
// console.log(ymd)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    storage: {},
    myData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'url参数')
    userName = options.name;
    if (hours <= 8 && minutes <= 10){
      this.autoTouch()
    } else if (hours >= 20 && minutes>30){
      this.autoTouch()
    }
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
    this.getSignData();
    this.setData({
      storage : wx.getStorageSync('user')
    })
    storage: wx.getStorageSync('user')
  },

  autoTouch(){// 指纹验证
    let _this=this;
    const startSoterAuthentication = () => {
      wx.startSoterAuthentication({
        requestAuthModes: [AUTH_MODE],
        challenge: 'test',
        authContent: '身份认证',
        success: (res) => {
          _this.login();
         
        },
        fail: (err) => {
          console.error(err)
          wx.showModal({
            title: '失败',
            content: '认证失败',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                _this.autoTouch()
              }
            }
          })
        }
      })
    }

    const checkIsEnrolled = () => {
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: AUTH_MODE,
        success: (res) => {
          console.log(res)
          if (parseInt(res.isEnrolled) <= 0) {
            wx.showModal({
              title: '错误',
              content: '您暂未录入指纹信息，请录入后重试',
              showCancel: false
            })
            return
          }
          startSoterAuthentication();
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }

    wx.checkIsSupportSoterAuthentication({
      success: (res) => {
        console.log(res)
        checkIsEnrolled()
      },
      fail: (err) => {
        console.error(err)
        wx.showModal({
          title: '错误',
          content: '您的设备不支持指纹识别',
          showCancel: false
        })
      }
    })
  },
  login() {//签到
    let data = wx.getStorageSync('user');
    console.log(data,'本地缓存数据');
    wx.request({
      url: `${server.default.ServerUrl}phz/WeixinStar/login.php`, //服务器登录php
      method: 'POST',
      data: {
        key: data.key,
        id: data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res, '---签到返回');
        if (res.data.number==200){
           wx.showToast({
             title: res.data.mes
          })
          this.getSignData();
        }
      }
    })
  },
  loginAndlogout(){//调用指纹验证
      // this.autoTouch();
    if (hours >= 16 && minutes>=30){
      this.autoTouch();
    }else{
      wx.showModal({
        title: '提示',
        content: '下午四点半后才可签退',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    // console.log(hours,minutes)
  },
  getSignData(){ //获取所有成员签到数据
    console.log(storage, '本地缓存数据');
    wx.request({
      url: `${ server.default.ServerUrl }/star/sourcus/php/sign.php`, //自己服务器登录php
      method: 'POST',
      data: {
        signListData: 'signListData'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        // console.log(res.data, '---获取签到');
        this.signData(res.data.sign[0])
      }
    })
  },
  signData(datas){//所有成员签到数据筛选
    console.log(datas);
    let name;
    let time;
    let arrayData=[];
    let myData = [];
    for (name in datas){
      for (time in datas[name]){
        if (time == ymd){
          let obj = {
            'name': name,
            'data': datas[name][time]
          }
          arrayData.push(obj)
          if (name == userName){
            myData.push(obj)
          }
        }
      }
      
    }
    this.setData({
      lists: arrayData,
      myData: myData[0].data
    })
    console.log(arrayData, myData)
  }
})