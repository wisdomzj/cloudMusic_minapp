// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const playlistCollection = db.collection("playlist")
const rp = require('request-promise')
const url = 'http://musicapi.xiecheng.live/personalized'
const MAX_LIMIT = 10 

// 云函数入口函数
exports.main = async (event, context) => {
  const playlist = await rp(url).then((res)=>{
    return JSON.parse(res).result
  })  
  const newData = []
  const countRes = await playlistCollection.count()
  const total = countRes.total
  const times = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < times;i++){
    let promise = await playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  let list = {
    data:[]
  }

  if (tasks.length > 0){
    list = (await Promise.all(tasks)).reduce((acc,cur)=>{
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  for (let i = 0; i < playlist.length;i++){
    let flag = true
    for (let j = 0; j < list.data.length;j++){
      if (playlist[i].id === list.data[j].id){
        flag = false
        break
      }
    }
    if(flag){
      newData.push(playlist[i])
    }
  }

  for (let i = 0; i < newData.length;i++){
    await playlistCollection.add({
      data:{
        ...newData[i],
        createtime: db.serverDate()
      }
    }).then((res)=>{
      console.log("插入成功")
    }).catch((err)=>{
      console.error("插入失败")
    })
  }

  return newData.length;
}