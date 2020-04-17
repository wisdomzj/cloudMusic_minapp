const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')

class Play{
    async findAll(ctx, next){
        const query = `db.collection('playlist').count()`        
        const tRes = await callCloudDB(ctx, 'databasecount', query)
        const total = tRes.count 
        const { start, count } = ctx.request.query 
        const curpage = Number.parseInt(start,10) || 1
        const len = Number.parseInt(count,10) || 5
        const sum = Math.ceil(total / len)
        const res = await callCloudFn(ctx, 'music', {
            $url: 'playlist',
            start: (curpage - 1) * len,
            count: len
        })
        let list = []
        if (res.resp_data) {
            list = JSON.parse(res.resp_data).data
        }

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

    async getById(ctx, next){
        const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
        const res = await callCloudDB(ctx, 'databasequery', query)
        ctx.body = {
            code: 20000,
            data: JSON.parse(res.data)
        }
    }

    async edit(ctx, next){
        const params = ctx.request.body
        const query = `
            db.collection('playlist').doc('${params._id}').update({
                data: {
                    name: '${params.name}',
                    copywriter: '${params.copywriter}'
                }
            })
        `
        const res = await callCloudDB(ctx, 'databaseupdate', query)
        ctx.body = {
            code: 20000,
            data: res
        }
    }

    async remove(ctx, next){
        const params = ctx.request.query
        const query = `db.collection('playlist').doc('${params.id}').remove()`
        const res = await callCloudDB(ctx, 'databasedelete', query)
        ctx.body = {
            code: 20000,
            data: res
        }
    }
}

module.exports = new Play()