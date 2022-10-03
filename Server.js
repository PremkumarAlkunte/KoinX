const request=require("request")
const mongoose=require('mongoose')
const express=require('express')
const app=express()

const myApi='SMFM3RBWV8W17JGXURK8T2QEMX596E253F'
const address='0xce94e5621a5f7068253c42558c147480f38b5e0d'

const Price=require('./Modals/Priceschema')
const Transaction=require('./Modals/TransactionSchema')


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.listen(process.env.PORT || 3003,(err)=>{
    if(!err){
        console.log("server is running")
    }else{
        console.log("err running in server")
    }
})
const db="mongodb+srv://Prem:Premalkunte@cluster0.dzyfwnu.mongodb.net/?retryWrites=true&w=majority"



mongoose.connect(db,()=>{
    console.log("Sucessfully connected to db")
},()=>{
    console.log("error connecting db")
})



app.post("/",async(req,res)=>{
function BalanceCalculator(data){
    let Balance=0
    for(let i=0;i<data.length;i++){    
         if(address===data[i].to){
             Balance =Balance+ parseInt(data[i].value)
         }
         if(address===data[i].from){
            Balance =Balance-parseInt(data[i].value)
         }
       
}
console.log(Balance)
return Balance}
    const price=await Price.find()
    const exist=await Transaction.find({Address:req.body.Address})
    let ResBal=0
    if(exist.length){
        ResBal=BalanceCalculator(exist[0].Result)
        res.send({Balance:ResBal,CurrentPrice:price[0].Price})     
    }else{
        request({
            url:`https://api.etherscan.io/api?module=account&action=txlist&address=${req.body.Address}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${myApi}`,
            json:true
        },async(err,res,body)=>{
           const input= await body.result
await Transaction.create({Address:req.body.Address,Result:body.result})
ResBal=BalanceCalculator(body.result)}) 
res.send({Balance:ResBal,CurrentPrice:price[0].Price})
    }
})


setInterval(()=>{
 request({
        url:"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr",
        json:true
    },async(err,res,body)=>{
      await Price.updateOne({Name:"Ethereum"},{Price:body.ethereum.inr})
    })
},600000)