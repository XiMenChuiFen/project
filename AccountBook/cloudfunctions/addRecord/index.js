const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  var time = event.time;
  //添加
    const add =  await db.collection('AccountBook_DayRecord').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        "_openid":event.id,
        "money": event.money,
        "remarks": event.remarks,
        "time": event.time,
        "typeIcon": event.typeIcon,
        "typeNane": event.typeNane,
        "currentType": event.currentType,
        "delectType": 0 //0未删除 1删除
      }
    })
    //查询今天有记录没
    const count=  await db.collection('AccountBook_DayCount').where({
      "time": time,
      "_openid": event.id
    }).get()
  


  if (count.data.length==0){ //没有
   
    if (event.currentType==1){
        //今天收入
        const day = await db.collection('AccountBook_DayCount').add({
          data: {
            "_openid": event.id,
            "time": event.time,
            "income": event.money,
            "pay": 0,
          }
        })

      }else{
        //今天支出
        const day = await db.collection('AccountBook_DayCount').add({
          data: {
            "_openid": event.id,
            "time": event.time,
            "income": 0,
            "pay": event.money,
          }
        })

      }
  }else{ //有

    if (event.currentType == 1) {
      //今天收入更新
      var day= await db.collection('AccountBook_DayCount').where({
        "time": time,
        "_openid": event.id
      }).update({
          data: {
            "income": count.data[0].income + event.money
          },
        })


    } else {
      //今天支出更新
      var day = await db.collection('AccountBook_DayCount').where({
        "time": time,
        "_openid": event.id
      }).update({
        data: {
          pay: count.data[0].pay + event.money
        },
      })

    }

  }

  //查询月表
  const monthCount = await db.collection('AccountBook_MonthCount').where({
    "time": (event.time.split("-")[0]) + "-" + event.time.split("-")[1],
    "_openid": event.id,
  }).get()

  if (monthCount.data.length == 0) {//没有
    if (event.currentType == 1) {

      //本月收入
      const month = await db.collection('AccountBook_MonthCount').add({
        data: {
          "_openid": event.id,
          "time": (event.time.split("-")[0]) + "-" + event.time.split("-")[1],
          "income": event.money,
          "pay": 0
        }
      })

    } else {
      //本月收入
      const month = await db.collection('AccountBook_MonthCount').add({
        data: {
          "_openid": event.id,
          "time": (event.time.split("-")[0]) + "-" + event.time.split("-")[1],
          "income": 0,
          "pay": event.money
        }
      })
    }
  }else{
    if (event.currentType == 1) {
       // 本月收入更新
      var month = await db.collection('AccountBook_MonthCount').where({
        "time": (event.time.split("-")[0]) + "-" + event.time.split("-")[1],
        "_openid": event.id
      }).update({
        data: {
          income: monthCount.data[0].income + event.money
        },
      })
    }else{
       // 本月支出更新
      var month = await db.collection('AccountBook_MonthCount').where({
        "time": (event.time.split("-")[0]) + "-" + event.time.split("-")[1],
        "_openid": event.id
      }).update({
        data: {
          pay: monthCount.data[0].pay + event.money
        },
      })
    }
  }



  //查询用户
  const user = await db.collection('AccountBook_UserCount').where({
    "_openid": event.id,
  }).get()
  if (user.data.length == 0){
    //用户统计
    const userCount = await db.collection('AccountBook_UserCount').add({
      data: {
        "_openid": event.id,
        "time": time,
        "day": 1,
        "statistics": 1,
        "continuityDay":1
      }
    })
  }else{

    if (time == user.data[0].time){
      const update = await db.collection('AccountBook_UserCount').where({
        "_openid": event.id,
      }).update({
        data: {
          "statistics": user.data[0].statistics+1
        }
      })
    }else{
      const update = await db.collection('AccountBook_UserCount').where({
        "_openid": event.id,
      }).update({
        data: {
          "day": user.data[0].day + 1,
          "statistics": user.data[0].statistics + 1
        }
      })
    }

  }


    return {
      errMsg:"ok",
      list: count,
      n: monthCount
    }
}

