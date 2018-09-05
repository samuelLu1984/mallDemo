     const express =require('express');
     const path=require('path')
     const app=express();
     const bodyParser = require('body-parser');
     const cookieParser=require('cookie-parser')
     // const formidable = require('express-formidable')
     const admin=require('./router/admin.js')
     const goods=require('./router/goods.js')
     const login=require('./router/login.js')
     const session=require('express-session')
     const users =require('./router/user.js')
     const order=require('./router/order.js')
     app.engine('html', require('express-art-template'));
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({ extended: false }));
     // app.use(formidable({
     //     encoding: 'utf-8',
     //     uploadDir: '../public/img',
     //     multiples: true,
     // }));
     app.use('/public/',express.static(path.join(__dirname,'public')))
     app.use('/public/',express.static("/public/"))
     // app.get('/',function (req,res) {
     //     res.send('hello,node')
     // })
     app.use(cookieParser())
     app.set('trust proxy', 1) // trust first proxy
     app.use(session({
         secret: 'keyboard cat',
         resave: false,
         saveUninitialized: true,
         cookie: { secure: true }
     }))
     app.use('/admin',admin)
     app.use('/goods',goods)
     app.use('/login',login)
     app.use('/user',users)
     app.use('/order',order)
     // app.use(function (req,res,next) {
     //     res.redirect('/login')
     //     next()
     // })
     // app.all('*', function (req, res, next) {
     //     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
     //     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     //     // res.header("Access-Control-Allow-Credentials", "true");
     //     res.header("Access-Control-Allow-Origin", "*");
     //     if (req.method == 'OPTIONS') {
     //         /*让options请求快速返回*/
     //         res.send(200);
     //     }
     //     else {
     //         next();
     //     }
     // });
     app.use(function (err, req, res, next) {
         res.json({
             status:'2',
             msg:'系统错误',
             result:''
         })
     })
     app.listen('3000',() =>{
         console.log('running....');
     })
