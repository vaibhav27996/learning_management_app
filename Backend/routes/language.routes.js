const express = require('express');
const  Langauge  = require('../controllers/language.controller')

const router = express.Router();


router
.get('/',Langauge.getLanguages)
.post('/createLanguage',Langauge.createLanguage)
.put('/updateLanguage/:id',Langauge.updateLanguage)
.delete('/deleteLanguage/:id',Langauge.deleteLanguage)

module.exports = router;