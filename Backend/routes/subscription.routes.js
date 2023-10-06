const express = require('express');
const  Subscription  = require('../controllers/subscription.controller')

const router = express.Router();


router
.get('/',Subscription.getSubscription)
.post('/createSubscription',Subscription.createSubscription)
.put('/updateSubscription/:id',Subscription.updateSubscription)
.delete('/deleteSubscription/:id',Subscription.deleteSubscription)

module.exports = router;