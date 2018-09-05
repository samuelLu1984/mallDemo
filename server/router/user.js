const express =require('express')
const router =express.Router();
const mongoose =require('mongoose')
const Users =require('../models/user.js')
const md5 =require('md5')
const Order=require('../models/order.js')
mongoose.connect('mongodb://localhost/goods')
router.post('/register',function (req,res) {
    let user=req.body
    Users.findOne({
        $or:[
            {userName:user.userName},
            {userName:user.userEmail}
        ]
    }).exec(function (err,data,next) {
        // console.log(data);
        if (err) {
            next(err)
        }
        if (data) {
           return res.json({
                status:'1',
                msg:'用户名或邮箱已存在',
                result:''
            })
        }
        let str=Date.now().toString()
        let salt1=Math.floor(Math.random()*10)
        let salt2=Math.floor(Math.random()*10)
        user.userId=str+salt1+salt2
        user.userPwd=md5(md5(user.userPwd+'llq')+'samuel')
       new Users(user).save(function (err1) {
           if (err1) {
               next(err1)
           }
           res.json({
               status:'0',
               msg:'注册成功',
               result:{
                   userName:user.userName,
                   userId:user.userId
               }
           })
       })
    })
})
router.post('/login',function (req,res) {
    Users.findOne({
        userEmail:req.body.userEmail,
        userPwd:md5(md5(req.body.userPwd+'llq')+'samuel')
    }).exec(function (err,user,next) {
        if (err){
            next(err)
        }
        if (!user) {
            return res.json({
                status:'1',
                msg:'邮箱或密码错误',
                result:''
            })
        }
        // res.cookie('userName',user.userName,{
        //     path:'/',
        //     maxAge:8000000
        // })
        // res.cookie('userId',user.userId,{
        //     path:'/',
        //     maxAge:8000000
        // })
        let cartCount=0
        user.cartList.forEach(item=>{
            cartCount += item.productNum
        })
        res.json({
            status:'0',
            msg:'登录成功',
            result:{
              user:{
                  userName:user.userName,
                  userId:user.userId
              },
                cartCount:cartCount
            }
        })
    })
})
router.post('/cart',function (req,res,next) {
    Users.findOne({
        userId:req.body.userId
    }).exec(function (err,user) {
        if (err) {
            next(err)
        }
        res.json({
            status:'0',
            msg:'',
            result:user.cartList
        })
    })
})
router.post('/edit/cart',function (req,res,next) {
   Users.update({
       'userId':req.body.userId,
       'cartList.productId':req.body.productId
   },{
       'cartList.$.productNum':req.body.productNum,
       'cartList.$.checked':req.body.checked
   },function (err) {
      if (err){
          next(err)
      }
   })
})
router.post('/edit/cartCheckAll',function (req,res,next) {
    Users.findOne({
        userId:req.body.userId
    }).exec(function (err,user) {
        if (err) {next(err)};
        user.cartList.forEach(item=>{
            item.checked=req.body.checkFlag
        })
        user.save(function (error) {
            if (error){next(error)}

        })
    })
})
router.post('/edit/delCart',function (req,res,next) {
    Users.update({
        userId:req.body.userId
    },{
        $pull:{
            cartList:{
                productId:req.body.productId
            }
        }
    },function (err) {
        if (err) {
            next(err)
        }
       res.json({
           status:'0',
           msg:'删除成功',
           result:''
       })
    })

})
router.post('/address',function (req,res,next) {
     Users.findOne({
         userId:req.body.userId
     }).exec(function (err,user) {
         if (err){
             next(err)
         }
         res.json({
             status:'0',
             msg:'获取购物车成功',
             result:{
                 addressList:user.addressList
             }
         })
     })
})
router.post('/edit/address',function (req,res,next) {
    let address={
        postAddress:req.body.postAddress,
        postName:req.body.postName,
        postTel:req.body.postTel,
        isDefault:req.body.isDefault
        }

        Users.findOne({
        userId:req.body.userId
    }).exec(function (err,user) {
        if (err) {
            next(err)
        }
        address.addressId=user.addressList.length+1
            if (address.isDefault) {
               user.addressList.forEach(item=>{
                 item.isDefault=false
               })
            }
        user.addressList.push(address)
            user.save(function (err1,data) {
                if (err1) {
                    next(err)
                }
                res.json({
                    status:'0',
                    msg:'suc',
                    result:''
                })
            })
    })
})
router.post('/edit/setDefaultAddress',function (req,res,next) {
    Users.findOne({
        userId:req.body.userId
    }).exec(function (err,user) {
        if (err) next(err);
        user.addressList.forEach(item=>{
            if (item.addressId==req.body.addressId){
                item.isDefault=true
            }else {
                item.isDefault=false
            }
        })
        user.save(function (err1) {
            if (err1) next(err1);
            res.json({
                status:'0',
                msg:'suc',
                result:''
            })

        })
    })
})
router.post('/edit/delAddress',function (req,res,next) {
    Users.update({
        userId:req.body.userId
    }, {
        $pull:{
            addressList:{
                addressId:req.body.addressId
            }
        }
    },function (err,data) {
        if (err) next(err);
        res.json({
            status:'0',
            msg:"suc",
            result:data
        })
    })
})

router.post('/getOrder',function (req,res,next) {
    Users.findOne({
        userId:req.body.userId
    }).exec(function (err,user) {
        if(err) next(err)
        let order =[]
        user.cartList.forEach(item=>{
            if (item.checked){
                order.push(item)
            }
        })
        res.json({
            status:'0',
            msg:'suc',
            result:order
        })
    })
})
router.post('/setOrder',function (req,res,next) {
    Users.findOne({
        userId:req.body.userId
    }).exec(function (err,user) {
        if (err) next(err)
        let order={
           userId:user.userId,
            discount:req.body.discount,
            tax:req.body.tax
        }
        order.orderId=2018+Date.now().toString()+Math.floor(Math.random()*100)

        order.goods=[]
        user.cartList.forEach((item,index)=>{
            if (item.checked){
                order.goods.push(item)
            }
        })
        user.addressList.forEach(item=>{
            if (item.addressId=req.body.addressId){
                order.address=item
                order.address.postage=req.body.postage
            }
        })
        new Order(order).save(function (err1,data) {
             if (err1) next(err1)
            console.log(data);
            res.json({
                status:'0',
                msg:'suc',
                result:''
            })
        })

    })
})
router.post('/orderSuc',function (req,res,next) {
    Order.findOne({userId:req.body.userId}).exec(function (err,order) {
        if (err) next(err)
        let orderTotal=0
        order.goods.forEach(item=>{
            orderTotal +=item.salePrice*item.productNum
        })
        res.json({
            status:'0',
            msg:'',
            result:{
                orderTotal:orderTotal,
                orderId:order.orderId
            }
        })
    })
})

module.exports=router