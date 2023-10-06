const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/learning_management_system');


const db=mongoose.connection;

db.on('error',(err)=>{console.log("Error in connnecting db",err)});

db.once('open',()=>{
    console.log("Connected to db");
});

module.exports=db;