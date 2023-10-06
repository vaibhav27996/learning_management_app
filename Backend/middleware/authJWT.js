const jwt =require('jsonwebtoken');

exports.authJWT=(req,res,next)=>{
    var token=req.headers.authorization;
    console.log("tokenssss",token);
    token =token.split(' ')[1];
    var privateKey="sdfsfsdf23wedsadr323rwewaedc2r34vrerfsdfertvsdfqwaercfwevavf";

    jwt.verify(token, privateKey, function(err,docs){
        if(err){
            res.send({message:"Invalid token"})
        }else{
            next();
        }

    })
}