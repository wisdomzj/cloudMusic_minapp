const Koa = require('koa')
const cors = require('koa2-cors')
const koabody = require('koa-body')
const error = require('koa-json-error')
const static = require('koa-static')
const routing = require('./router')
const path = require('path')
const app = new Koa()
const ENV = 'test-iougz'

// 静态资源
app.use(static(path.join(__dirname,"./public")))

// 统一捕获错误
app.use(error({
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest :  {stack, ...rest}
}))

// 跨域
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))

// 接受post参数
app.use(koabody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname,'/public/upload'),
        keepExtensions:true
    }
}))

// 传递env环境变量
app.use(async (ctx, next)=>{
    ctx.state.env = ENV
    await next()
})

// 加载路由
routing(app)

app.listen(3000, ()=>{
    console.log("服务启动成功 端口号：3000")
})