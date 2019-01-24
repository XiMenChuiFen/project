
var util = require('../../utils/util.js');
var server = require('../../utils/server.js');
Page({
  data: {
    nextShow:false,
  },
  onLoad: function (options) {

  },
  onShow: function () {
    // this.getAddress();
    this.getWiFi();
  },
  getSTo(){ //获取本地缓存
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res,"页面进入获取是否有本地用户信息");
        wx.redirectTo({
          url: '../../subpackage/result/result?name=' + res.data.name
        })
      },
      fail:(res)=>{
        console.log(res, "没有本地缓存");
        this.setData({
          nextShow:true
        })
      }
    })
  },
  next() { //下一步按钮
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res, "页面进入获取是否有本地用户信息");
        wx.redirectTo({
          url: '../../subpackage/result/result'
        })
      },
      fail: (res) => {
        console.log(res, "没有本地缓存");
        wx.redirectTo({
          url: '../../subpackage/binduser/binduser'
        })
      }
    })
  },
  getWiFi(){ //获取wifi信息
    wx.showLoading({
      title: '请稍等',
      mask:true
    })
    let _this=this;
    wx.getNetworkType({  //判断是否为wifi
      success(res) {
        console.log(res);
        if (res.networkType=="wifi"){
            wx.startWifi({  //获取wifi信息
              success: () => {
                wx.getConnectedWifi({
                  success:(res)=>{
                    console.log(res,"wifi");
                    if ((res.wifi.SSID === server.default.WifiName5G || res.wifi.SSID === server.default.WifiName) && res.wifi.BSSID === server.default.BssId){
                      wx.hideLoading();
                      _this.getSTo();
                    }else{
                      _this.modal('请链接指定WiFi再重试');
                    } 
                  }
                })
              }
            });
        }else{
          _this.modal('请链接指定WiFi再重试');
        }

      }
    })
  },
  modal(content){ //提示框
    let _this=this;
    wx.hideLoading();
    wx.showModal({
      title: '错误',
      content: content,
      showCancel:false,
      confirmText:'重试',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          _this.getAddress();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})