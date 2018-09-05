 const express=require('express')
 const router = express.Router()
 const mongoose=require('mongoose')
 const Users =require('../models/user.js')
 const Order=require('../models/order.js')
 const md5=require('md5')
 mongoose.connect('mongodb://localhost/goods')

 router.get('/',function (req,res) {

     Users.find(function (err,data) {
         if  (err){
             console.log(err);
         }
         let users =data


         res.json(users)
     })
 })
 // router.get('/checkLogin',function (req,res) {
 //     console.log(req.session);
 // })
 router.get('/delete',function (req,res) {
     console.log(req.query);
     if (req.query) {

         Users.remove(req.query,function (err) {
             if (err){
                 res.json(err)
             }
         })
     }
     res.redirect('/login')
 })
 router.post('/',function (req,res) {
     let body=req.body
     // console.log(body);
     Users.findOne({
         userEmail:body.userEmail,
         userPwd:md5(md5(body.userPwd))
     }).then(data=>{
         if (!data){
             return res.json({
                 status:'1',
                 msg:'账户或密码错误',
                 user:null
             })
         }
         // console.log(req.cookies);
         req.session.user=data
         // console.log(req.session.statusCode);

         res.json({
             status:'0',
             msg:'',
             result:{
                 userName:data.userName,
                 userId:data.userId
             }
         })
     })
 })
 router.get('/order',function (req,res,next) {
     Order.find({
         userId:req.query.userId
     },function (err,orders) {
        res.json(orders)
     })
 })
 router.get('/delOrder',function (req,res) {
     Order.remove({
         userId:req.query.userId
     },function (err,doc) {
         console.log(doc);
         res.redirect('/login/order')
     })
 })

 module.exports=router