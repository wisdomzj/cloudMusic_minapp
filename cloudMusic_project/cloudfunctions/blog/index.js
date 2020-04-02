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

  const wxContext = cloud.getWXContext()

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
  
  app.router('getListByOpenid', async(ctx, next) => {
    ctx.body = await blogCollection.where({
        _openid: wxContext.OPENID
      }).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })
  })

  app.router('detail',async(ctx, next)=>{
    // 获取博客详情
    let blogId = event.blogId
    let detail = await blogCollection.where({
      _id: blogId
    }).get().then((res)=>{
      return res.data
    })

    // 查询该博客相关的评论
    const countResult = await blogCollection.count()
    const total = countResult.total
    let commentList = {
      data: []
    }

    if(total > 0){
      const batchTimes = Math.ceil(total / MAX_LIMIT)
      const tasks = []
      
      for(let i=0;i<batchTimes;i++){
        let promise = db.collection('blog-comment').skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT).where({
          blogId
        }).orderBy('createTime','desc').get()
        tasks.push(promise)
      }

      if(tasks.length > 0){
        commentList = (await Promise.all(tasks)).reduce((acc,cur)=>{
          return {
            data: acc.data.content(cur.data)
          }
        })
      }  
    }
    ctx.body = {
      commentList,
      detail
    }
  })

  return app.serve()
}