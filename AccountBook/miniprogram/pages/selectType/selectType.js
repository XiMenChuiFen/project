// pages/selectType/selectType.js
const CONFIG = require('../../config.js');
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    config: CONFIG,
    types:[
      { "id": 0, "name": "餐饮", "inEx": 0, "isDefault": true, "icon": 0 },
      { "id": 1, "name": "购物", "inEx": 0, "isDefault": true, "icon": 1 },
      { "id": 2, "name": "日用", "inEx": 0, "isDefault": true, "icon": 2 },
      { "id": 3, "name": "交通", "inEx": 0, "isDefault": true, "icon": 3 },
      { "id": 4, "name": "蔬菜", "inEx": 0, "isDefault": true, "icon": 4 },
      { "id": 5, "name": "水果", "inEx": 0, "isDefault": true, "icon": 5 },
      { "id": 6, "name": "零食", "inEx": 0, "isDefault": true, "icon": 6 },
      { "id": 7, "name": "运动", "inEx": 0, "isDefault": true, "icon": 7 },
      { "id": 8, "name": "娱乐", "inEx": 0, "isDefault": true, "icon": 8 },
      { "id": 9, "name": "通讯", "inEx": 0, "isDefault": true, "icon": 9 },
      { "id": 10, "name": "服饰", "inEx": 0, "isDefault": true, "icon": 10 },
      { "id": 11, "name": "美容", "inEx": 0, "isDefault": true, "icon": 11 },
      { "id": 12, "name": "住房", "inEx": 0, "isDefault": true, "icon": 12 },
      { "id": 13, "name": "居家", "inEx": 0, "isDefault": true, "icon": 13 },
      { "id": 14, "name": "孩子", "inEx": 0, "isDefault": true, "icon": 14 },
      { "id": 15, "name": "长辈", "inEx": 0, "isDefault": true, "icon": 15 },
      { "id": 16, "name": "社交", "inEx": 0, "isDefault": true, "icon": 16 },
      { "id": 17, "name": "旅行", "inEx": 0, "isDefault": true, "icon": 17 },
      { "id": 18, "name": "烟酒", "inEx": 0, "isDefault": true, "icon": 18 },
      { "id": 19, "name": "数码", "inEx": 0, "isDefault": true, "icon": 19 },
      { "id": 20, "name": "汽车", "inEx": 0, "isDefault": true, "icon": 20 },
      { "id": 21, "name": "医疗", "inEx": 0, "isDefault": true, "icon": 21 },
      { "id": 22, "name": "书籍", "inEx": 0, "isDefault": true, "icon": 22 },
      { "id": 23, "name": "学习", "inEx": 0, "isDefault": true, "icon": 23 },
      { "id": 24, "name": "宠物", "inEx": 0, "isDefault": true, "icon": 24 },
      { "id": 25, "name": "礼金", "inEx": 0, "isDefault": true, "icon": 25 },
      { "id": 26, "name": "礼物", "inEx": 0, "isDefault": true, "icon": 26 },
      { "id": 27, "name": "办公", "inEx": 0, "isDefault": true, "icon": 27 },
      { "id": 28, "name": "维修", "inEx": 0, "isDefault": true, "icon": 28 },
      { "id": 29, "name": "捐赠", "inEx": 0, "isDefault": true, "icon": 29 },
      { "id": 30, "name": "彩票", "inEx": 0, "isDefault": true, "icon": 30 },
      { "id": 31, "name": "亲友", "inEx": 0, "isDefault": true, "icon": 31 },
      { "id": 32, "name": "快递", "inEx": 0, "isDefault": true, "icon": 32 },
      { "id": 33, "name": "工资", "inEx": 0, "isDefault": true, "icon": 33 },
      { "id": 34, "name": "兼职", "inEx": 0, "isDefault": true, "icon": 34 },
      { "id": 35, "name": "理财", "inEx": 0, "isDefault": true, "icon": 35 },
      // { "id": 36, "name": "礼金", "inEx": 0, "isDefault": true, "icon": 36 },
      { "id": 36, "name": "其他", "inEx": 0, "isDefault": true, "icon": 36 },
    ],
    id:null, // 上次选中的类型数组index
    currentType:0, //滑动位置 0支出 1收入
    padding:0,
    animationData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.config)
    // console.log(wx.getStorageSync("id"))
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
    
    wx.hideTabBar({
      animation:true
    })
    let types = this.data.types;
    if (this.data.id != null) { // 取消上次选中
      types[this.data.id].icon = types[this.data.id].id;
    }
    this.setData({
      id: null, // 上次选中的类型数组index
      // currentType: 0, //滑动位置 0支出 1收入
      padding: 0,
      animationData: "",
      types: types,
      // currentType: 0
    })
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

  clickPayType(e){ // 点击类型
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let types = this.data.types;
    types[id].icon = id + '-1'; //选中当前的

    if (this.data.id!=null){ // 取消上次选中
      types[this.data.id].icon = types[this.data.id].id;
    }
    //键盘动画
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
    })
    animation.translateY(0).step();

    this.setData({
      types:types,
      id:id,
      animationData: animation.export(),
      padding:415,
    })

  },
  swiperChange(e){ // 检测类型滑动
    // console.log(e);
    this.setData({
      currentType: e.detail.current
    })
  },
  clickTab(e){ //点击tab
    // console.log(Number(e.currentTarget.dataset.current));
    let types = this.data.types;
    if (this.data.id != null){
      types[this.data.id].icon = types[this.data.id].id;// 取消选中
    }
    this.setData({
      currentType:Number(e.currentTarget.dataset.current),
      types: types,
      id: null,
    })
  },
  Keyboard(e){//监控键盘完成键

    // 收起键盘动画
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
    })
    animation.translateY(415).step();
    this.setData({
      animationData: animation.export(),
      padding: 0,
    })

    console.log(e.detail, this.data.id, this.data.types[this.data.id]);
    if (this.data.types[this.data.id]!=undefined){

    let typeNane = this.data.types[this.data.id].name;
    let time = e.detail.time;
    let money = e.detail.money;
    let remarks = e.detail.remarks;
    if (remarks==''){
      remarks = typeNane;
    }

    //云函数
    wx.cloud.callFunction({
      name: 'addRecord',
      data: {
        "id": wx.getStorageSync("id"),
        "money": Number(money),
        "remarks": remarks,
        "time": time,
        "typeIcon": this.data.types[this.data.id].id,
        "typeNane": typeNane,
        "currentType": this.data.currentType
      },
      success: res => {
        console.log(res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000,
        })
        setTimeout(()=>{
          wx.switchTab({
            url: "../index/index"
          })
        },1000)
      },
      fail: err => {
        console.error(err);
        wx.showToast({
          title: '记录失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    }


  }
})