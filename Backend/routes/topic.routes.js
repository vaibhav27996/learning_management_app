const express = require('express');
const  Topic  = require('../controllers/topic.controller')

const router = express.Router();


router
.get('/',Topic.getTopics)
.post('/createTopic',Topic.createTopic)
.put('/updateTopic/:id',Topic.updateTopic)
.delete('/deleteTopic/:id',Topic.deleteTopic)

module.exports = router;