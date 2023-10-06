const express = require('express');
const  Faq  = require('../controllers/faq.controller')

const router = express.Router();


router
.get('/',Faq.getFaq)
.post('/createFaq',Faq.createFaq)
.put('/updateFaq/:id',Faq.updateFaq)
.delete('/deleteFaq/:id',Faq.deleteFaq)

module.exports = router;