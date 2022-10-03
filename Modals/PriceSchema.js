const mongoose=require('mongoose')
const PriceSchema=mongoose.Schema({
  Name:String,
  Price:Number
})
const Price=mongoose.model("price",PriceSchema)
module.exports=Price