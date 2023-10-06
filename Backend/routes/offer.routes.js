const express = require('express');
const  Offer  = require('../controllers/offer.controller')

const router = express.Router();


router
.get('/',Offer.getOffer)
.post('/createOffer',Offer.createOffer)
.put('/updateOffer/:id',Offer.updateOffer)
.delete('/deleteOffer/:id',Offer.deleteOffer)

module.exports = router;