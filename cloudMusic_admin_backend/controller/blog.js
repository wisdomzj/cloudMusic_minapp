const callCloudDB = require('../utils/callCloudDB.js')
const cloudStorage = require('../utils/callCloudStorage.js')

class Blog{
    async findAll(ctx, next){
        const q_count = `db.collection('blog').count()`        
        const tRes = await callCloudDB(ctx, 'databasecount', q_count)
        const total = tRes.count 
        const { start, count } = ctx.request.query 
        const curpage = Number.parseInt(start,10) || 1
        const len = Number.parseInt(count,10) || 5
        const sum = Math.ceil(total / len)
        const q_get = `
            db.collection('blog').skip(${(curpage-1)*len}).limit(${len}).orderBy('createTime', 'desc').get()
        `
        const list = await callCloudDB(ctx, 'databasequery', q_get)
        
        ctx.body = {
            data: {
                total,
                curpage,
                len,
                sum,
                list
            },
            code: 20000
        }
    }

    async remove(ctx, next){
        const params = ctx.request.body
        const queryBlog = `db.collection('blog').doc('${params._id}').remove()`
        const delBlogRes = await callCloudDB(ctx, 'databasedelete', queryBlog)
        const queryComment = `db.collection('blog-comment').where({
            blogId: '${params._id}'
        }).remove()`
        const delCommentRes = await callCloudDB(ctx, 'databasedelete', queryComment)
        const delStorageRes = await cloudStorage.delete(ctx, params.img)
        ctx.body = {
            code: 20000,
            data: {
                delBlogRes,
                delCommentRes,
                delStorageRes
            }
        }
    }
}

module.exports = new Blog()
