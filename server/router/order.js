const express=require('express')
const router =express.Router()
const mongoose=require('mongoose')
const User=require('../models/user.js')
const Order=require('../models/order.js')
mongoose.connect('mongodb://localhost/goods')
router.post('/',function (req,res,next) {
    console.log(req.body);
})
module.exports=router