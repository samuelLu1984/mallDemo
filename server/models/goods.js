
 const mongoose=require('mongoose');
 const Schema =mongoose.Schema;
 let goodsSchema =new Schema({
     "productId":{type:String, required:true},
     "productName":{type:String, required:true},
     "salePrice":{type:Number, required:true},
     "productImg":{type:String,required:true}
 })
 module.exports=mongoose.model('Good',goodsSchema)
