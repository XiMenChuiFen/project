// components/title/title.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:String,
    type: Number,
    urlText:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:'',
    returnIcon:0,
    url:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTitle(){
      // console.log(this.data.text)
      this.setData({
        title: this.data.text,
        returnIcon: this.data.type,
        url: this.data.urlText
      })
    },
    returnUrl(){
      // console.log(11)
      wx.switchTab({
        url: this.data.url
      })
    }
  },
  attached(){
    this.getTitle();
  }
})
