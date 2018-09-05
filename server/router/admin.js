const express =require('express')
const router =express.Router();
const mogoose =require('mongoose');
// const formidable=require('formidable')
const path=require('path')
const fs=require('fs')
const Goods =require('../models/goods.js')
mogoose.connect('mongodb://localhost/goods')
 router.get('/',function (req,res) {
     Goods.find(function (err,data) {
         let goods=data
         res.render('list.html',{
             goods:goods
         })
     })


 })
router.get('/add',function (req,res) {
    res.render('add.html')
})
router.get('/update',function (req,res) {

    res.render('update.html',{
        productId:req.query.productId
    })
})
router.post('/add',function (req,res) {
    let good=req.body;
     good.salePrice=parseInt(good.salePrice)
   new Goods(good).save(function (err) {
       if (err) {
          return
       }
       res.redirect('/admin')

   });
})
router.get('/delete',function (req,res) {
    let good=req.body
    good.salePrice=parseInt(good.salePrice)
   Goods.remove({productId:req.query.productId},function (err) {
       if (err) {
          return
       }
        res.redirect('/admin')
   })

})
module.exports=router