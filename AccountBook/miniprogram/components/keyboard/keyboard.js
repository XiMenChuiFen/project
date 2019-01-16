// subpackage/keyboard/keyboard.js
const CONFIG = require('../../config.js');
const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
const strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
// console.log(year + "/" + month + "/" + strDate)
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    config: CONFIG,
    keyNumber:["7","8","9","4","5","6","1","2","3",".","0"],//键盘值
    remarks:'', //备注
    date: year + "-" + month + "-" + strDate, //时间
    money: [],//输入金额
    moneyHtml:[],//显示在页面的输入金额,
    start: year + "-" + month,
    end: year + "-" + month + "-" + strDate
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChage(e){ //input
      this.setData({
        remarks: e.detail.value
      })
    },
    timeChange(e){//时间
      this.setData({
        date: e.detail.value
      })
      // console.log(e.detail.value, this.data.remarks);
    },

    clickKey(e){
      // console.log(e.currentTarget.dataset.key);
      let key = e.currentTarget.dataset.key;

      let money = this.data.money;
      if (key!="dele"){ //是否按下dele
        if (key === "0" && money.length===0){ //按下0是并且数组长度0时
          money.push('0.');
        }else{
          if (key != "."){ //按下不是.时
            money.push(key);
          } else if (money.length > 0 && money.indexOf('0.') === -1 && money.indexOf('.') === -1 ){
            //数组长度大于0并且没有0.和.存在
            money.push(key);
          }
        }
        // console.log(money)  
      } else {
        if (money.length>0){
          //删除数组最后个值
          money.pop();
        }
      }
      this.setData({
        money: money,
        moneyHtml: money.join("")
      })
      // console.log(money)  
    },
    ok(){ //确认
      let money = this.data.money.join("");
      if (this.data.money[this.data.money.length - 1] === "." || this.data.money[this.data.money.length - 1] === "0."){
        money+="00";
        //补零
      }
      if (this.data.money.length===0){
        money = "0.00";
      }
      let obj={
        "remarks": this.data.remarks,
        "time": this.data.date,
        "money": money
      }
      this.triggerEvent('Keyboard', obj,{ bubbles: false });
      this.setData({
        remarks: '', //备注
        date: year + "-" + month + "-" + strDate, //时间
        money: [],//输入金额
        moneyHtml: [],//显示在页面的输入金额,
        start: year + "-" + month,
        end: year + "-" + month + "-" + strDate
      })
    },

  },
  attached() {
  }
})
