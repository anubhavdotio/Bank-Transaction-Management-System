const mongoose=require("mongoose")

  function connectTODB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Server is connected successfully to database")
    })
  }

  module.exports=connectTODB