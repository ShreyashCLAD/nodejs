var mongoose=require('mongoose')
var customerSchema=new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
Firstname:String,
Lastname:String,
Date:Date,
Email:String,
MobileNo:String,
Address:String,
City:String,
State:String,
Pin:String,
Country:String
});
var Model = mongoose.model("Customers", customerSchema, "Customers");
//native skype life android app lifecycle rbubn on native , archtecrure, source tree
module.exports=Model