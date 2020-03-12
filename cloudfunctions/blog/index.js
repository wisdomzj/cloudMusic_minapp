// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')
const db = cloud.database()
const blogCollection = db.collection('blog')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, ctx) => {
  const app = new TcbRouter({
    event
  })

  app.router('list',async(ctx,next)=>{
    const keyword = event.keyword
    let w = {}
    if (keyword.trim() != '') {
      w = {
        content: new db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }

    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })

    ctx.body = blogList
  })

  const wxContext = cloud.getWXContext()
  app.router('getListByOpenid', async(ctx, next) => {
    ctx.body = await blogCollection.where({
        _openid: wxContext.OPENID
      }).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })
  })

  return app.serve()
}