const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	'userId':{type:String, required:true},
	'userName':{type:String, required:true},
	'userPwd':{type:String, required:true},
	'userImg':{type:String,default:'avatar-default.png'},
    'userEmail':{type:String, required:true},
	'userGender':{type:String, default:"0"},
    'createTime':{type:Date,default:Date.now},
    'cartList':[
        {
            "productId":{type:String, required:true},
            "productName":{type:String, required:true},
            "salePrice":{type:Number, required:true},
            "productImg":{type:String,required:true},
            'productNum':{type:Number,default:1},
            'checked':{type:Boolean,default:false}
        }
    ],
    'addressList':[{
	    'addressId':{type:String,required:true},
	    'postName':{type:String,required:true},
        'postAddress':{type:String,required:true},
        'postTel':{type:String,required:true},
        'isDefault':{type:Boolean,default:false}
    }]
});
module.exports=mongoose.model('User',userSchema)
