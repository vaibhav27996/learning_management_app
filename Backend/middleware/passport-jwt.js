const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const env=require('./environment');
const Admin = require('../models/admins');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"sdfsdffsdsdfsdfafsdfsdfdfafsdfsdaZwer34werthdfbvawef23we"

}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    Admin.findById(jwtPayLoad._id).then(()=>{
        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }).catch((err)=>{
        if (err){console.log('Error in finding user from JWT'); return;}
    })
}));



module.exports = authJWT;