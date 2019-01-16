// components/chart/chart.js
var week = new Date().getDay()
if (week==0){
  week=6
}else{
  week=week-1
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    xTime:{
      type:Array,
      value:false,
      observer:function(){
        this.getData();
      }
    },
    type:{
      type: Number,
      value: 0,
      observer: function () {
        this.getData();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    times: [], //x轴时间
    type:0,// 类型
    max:0, //最大的条形值
    day: week,//今天天数
    selectList:-1,
    touchChart:false,
    touchData:[],
    left:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(){ // 获取参数
      this.setData({
        times: this.data.xTime,
        type: this.data.type,
        max: Math.max.apply(Math, this.data.xTime.map( (o)=> { 
          if (this.data.type==0){
            return o.pay 
          }
          return o.income
        }))
      })
      // console.log(this.data);
    },
    touchStart(e){  //按下去
      console.log(wx.getStorageSync("chartList"), e);
      let left=0;
      if (e.currentTarget.dataset.index == 0 || e.currentTarget.dataset.index == 2){
        left = 35
      } else if (e.currentTarget.dataset.index == 3){
        left = 80
      } else if (e.currentTarget.dataset.index == 4) {
        left = 120;
      } else if (e.currentTarget.dataset.index == 5) {
        left = 150;
      }
      else if (e.currentTarget.dataset.index == 6) {
        left = 170;
      }
      this.setData({
        selectList:e.currentTarget.dataset.index,
        touchChart:true,
        touchData: wx.getStorageSync("chartList"),
        left: left
      })
      let data={
        time: e.currentTarget.dataset.time,
        type: this.data.type
      }
      this.triggerEvent('clickChartList', data ,{bubbles:false})
    },
    touchEnd(e){ //松开
      this.setData({
        selectList:-1,
        touchChart:false
      })
      // console.log(e.currentTarget.dataset)
    },
  },
  attached(){
    // this.getData();
  }
})
