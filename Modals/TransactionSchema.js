const mongoose=require('mongoose')
const TransactionSchema=mongoose.Schema({
   Address:String,
   Result:Array
})
const Transaction=mongoose.model('transactions',TransactionSchema)
module.exports=Transaction