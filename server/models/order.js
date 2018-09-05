const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    'orderId':{type:String,required:true},
    'userId':{type:String,required:true},
    'goods':[
        {
            "productId":{type:String, required:true},
            "productName":{type:String, required:true},
            "salePrice":{type:Number, required:true},
            "productImg":{type:String,required:true},
            'productNum':{type:Number,default:1},
            'checked':Boolean
        }
    ],
    'address':{
        'addressId':{type:String,required:true},
        'postName':{type:String,required:true},
        'postAddress':{type:String,required:true},
        'postTel':{type:String,required:true},
        'postage':{type:Number,default:0}
    },
    'discount':{type:Number,default:0},
    'message':{type:String,default:""},
    'tax':{type:Number,default:0},
    'payment':{type:Boolean,default:false}
})
module.exports=mongoose.model('Order',orderSchema)