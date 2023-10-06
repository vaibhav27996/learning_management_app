
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port=8000;
const cors = require("cors");
const session= require('express-session');

//import passport liberary
const passport =require('passport');
const passportLocal = require('./middleware/authentication');

const db=require('../Backend/config/mongoose');
const userRouter = require('./routes/user.routes')
const languageRouter=require('./routes/language.routes');
const topicRouter=require('./routes/topic.routes');
const subscriptionRouter=require('./routes/subscription.routes');
const offerRouter=require('./routes/offer.routes');
const faqRouter=require('./routes/faq.routes');
const couponRouter=require('./routes/coupon.routes');
const lessonRouter=require('./routes/lesson.routes');
const adminRouter= require('./routes/admin.routes');
const Admin =require('./models/admins');

db;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'your-secret-key', // Replace with a strong, secret key
  resave: false,
  saveUninitialized: true,
  cookie: {secure:false, maxAge:60000}
}));

//initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());


// use expressjs routes
app.use('/users', userRouter);
app.use('/languages', languageRouter);
app.use('/topics', topicRouter);
app.use('/subscriptions',subscriptionRouter);
app.use('/offer',offerRouter);
app.use('/faq',faqRouter);
app.use('/coupon',couponRouter);
app.use('/lesson',lessonRouter);
app.use('/admin',adminRouter);


app.listen(port,(err)=>{
  if(err){
    console.log("error",err);
  }

  console.log("Server is running on port",port);
})