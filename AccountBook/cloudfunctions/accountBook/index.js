const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  var time = event.time;
  // 先取出集合记录总数
  const countResult = await db.collection('AccountBook_DayRecord').count()
  const total = countResult.total
  if (total>0){
  // // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('AccountBook_DayRecord').where({
      time: db.RegExp({
        regexp: time,
        options: 'm',
      }),
      "_openid": event.id,
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).orderBy('time', 'desc').get()
    tasks.push(promise)
  }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => ({
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }))
  }else{
    return {
      data: [],
      errMsg: "ok",
    }
  }

}