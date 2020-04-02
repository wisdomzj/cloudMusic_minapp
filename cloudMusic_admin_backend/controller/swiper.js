const callCloudDB = require('../utils/callCloudDB.js')
const cloudStorage = require('../utils/callCloudStorage.js')

class Swiper{
    async findAll(ctx, next){
        const query = `db.collection('swiper').get()`
        const res = await callCloudDB(ctx, 'databasequery', query)
        let fileList = []
        const data = res.data
        for (let i = 0, len = data.length; i < len; i++) {
            fileList.push({
                fileid: JSON.parse(data[i]).fileid,
                max_age: 7200
            })
        }
        const dlRes = await cloudStorage.download(ctx, fileList)
        let returnData = []
        for (let i = 0, len = dlRes.file_list.length; i < len; i++) {
            returnData.push({
                download_url:  dlRes.file_list[i].download_url, 
                fileid: dlRes.file_list[i].fileid,
                _id: JSON.parse(data[i])._id
            })
        }
        
        ctx.body = {
            data: returnData,
            code: 20000
        }
    }

    async upload(ctx, next){
        const fileid =  await cloudStorage.upload(ctx)
        const query = `
            db.collection('swiper').add({
                data: {
                    fileid: '${fileid}'
                }
            })
        `
        const res = await callCloudDB(ctx, 'databaseadd', query)
        ctx.body = {
            code: 20000,
            id_list: res.id_list
        }
    }

    async remove(ctx, next){
        const params = ctx.request.query
        const query = `db.collection('swiper').doc('${params._id}').remove()`
        const delDBRes = await callCloudDB(ctx, 'databasedelete', query)
        const delStorageRes = await cloudStorage.delete(ctx, [params.fileid])
        
        ctx.body = {
            code: 20000,
            data: {
                delDBRes,
                delStorageRes,
            }
        }
    }
}

module.exports = new Swiper()