const express = require('express');
const  Lesson  = require('../controllers/lesson.controller')

const router = express.Router();


router
.get('/',Lesson.getLessons)
.post('/createLesson',Lesson.createLesson)
.put('/updateLesson/:id',Lesson.updateLesson)
.delete('/deleteLesson/:id',Lesson.deleteLesson)

module.exports = router;