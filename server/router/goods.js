const express=require('express')
const router=express.Router()
const mongoose =require('mongoose')
const Goods =require('../models/goods')
const Users=require('../models/user.js')
mongoose.connect('mongodb://localhost/goods')
router.get('/list',function (req,res) {
    // console.log('ok');
    req.query.sortFlag=parseInt(req.query.sortFlag)
    req.query.pageNum=parseInt(req.query.pageNum)
    req.query.pageSize=parseInt(req.query.pageSize)
    let priceLv=req.query.priceLv
    // console.log(req.query);
    let priceGt=0,priceLt=0;
    let params={}

    switch (priceLv){
            case '1':priceGt=0;priceLt=100;break;
            case '0':priceGt=0;priceLt=30000;break;
            case '2':priceGt=100;priceLt=500;break;
            case '3':priceGt=500;priceLt=1000;break;
            case '4':priceGt=1000;priceLt=2000;break;
            case '5':priceGt=2000;priceLt=30000;break;
    }
    params={
            salePrice:{
                $gt:priceGt,
                $lt:priceLt
            }
    }

    // console.log(params);
    let goodsModel=Goods.find(params)


    goodsModel=goodsModel.skip((req.query.pageNum-1)*req.query.pageSize).limit(req.query.pageSize)
    if (req.query.sortFlag ) {
        goodsModel.sort({'salePrice':req.query.sortFlag})
    }
    goodsModel.exec(function (err,data) {
        if (err){
            res.json({
                status:1,
                result:"",
                msg:err.message
            })
        }
        res.json({
            status:0,
            result:data,
            msg:"Ok"
        })
    })
})
router.post('/addCart',function (req,res,next) {
   
    let userId=req.body.userId
    let productId=req.body.productId
    console.log(productId);
    let productFlag=''
    Users.findOne({userId:userId}).exec((err,user)=>{
       if (err){
           next(err)
       }
       // user.cartList=[]
       //  user.save(function (err2) {
       //
       //  })
       user.cartList.forEach(item=>{
           if (item.productId === productId) {
               item.productNum++
               productFlag=item
               user.save(err2=>{
                   if (err2) {
                       next(err2)
                   }
                   res.json({
                       status:"0",
                       msg:'加入成功',
                       result:''
                   })
               })
           }
       })
        console.log(productFlag);
        if (!productFlag) {
           Goods.findOne({productId:productId}).exec((error,good)=>{
               if (error) {
                   next(err)
               }
               user.cartList.push(good)
               user.save(err2=>{
                   if (err2) {
                       next(err2)
                   }
                   res.json({
                       status:"0",
                       msg:'加入成功',
                       result:''
                   })
               })
           })
        }

    })

})
router.get('/',function(req,res){
    Users.find(function(err,data){
        res.json(data)
    })
})
module.exports=router
