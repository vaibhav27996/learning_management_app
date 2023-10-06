const Lesson = require('../models/lessons');
const BlockType = require('../models/block_types');


//Fetch lessons
exports.getLessons = async (req, res) => {
    try {

        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"lesson_name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"lesson_seq_no":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"lesson_type":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"topicData.topic_name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }}  
                    ]
            })
        }

        if(req.query.lessonName!="" && req.query.lessonName!=undefined){
            match.$and.push({"lesson_name":{ $regex: ".*" + req.query.lessonName + ".*", $options: 'i' }})
        }
        if(req.query.lesson_seq_no!="" && req.query.lesson_seq_no!=undefined){
            match.$and.push({"lesson_seq_no":{ $regex: ".*" + req.query.lesson_seq_no + ".*", $options: 'i' }})
        }
        if (req.query.lesson_type != "" && req.query.lesson_type != undefined) {
            match.$and.push({ "lesson_type": {$regex: ".*" + req.query.lesson_type  + ".*", $options: 'i' }});
        }
        if (req.query.topic != "" && req.query.topic != undefined) {
            console.log(req.query.topic);
            match.$and.push({ "topicData.topic_name":{ $regex: ".*" + req.query.topic + ".*", $options: 'i' } });
        }
       
        Lesson.aggregate([
            {
                $lookup: {
                    from: "topics",
                    localField: "topic_id",
                    foreignField: "_id",
                    as: "topicData"
                }
            },
            {
                $lookup: {
                    from: "block_types",
                    localField: "_id",
                    foreignField: "lesson_id",
                    as: "blockData"
                }
            },
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    _id: "$_id",
                    lesson_name: "$lesson_name",
                    lesson_type:"$lesson_type",
                    lesson_seq_no: "$lesson_seq_no",
                    topicDatas: {$arrayElemAt:["$topicData",0]},
                    blockDatas: {$arrayElemAt:["$blockData",0]}
                }
            }
        ]).then((data) => {
         
            return res.status(200).json({ 
                status: "success", data: data 
            })

          
        }).catch((err) => {
            return res.status(200).json({
                status: "failure",
                message: "error getting lesson",
                 error: err 
            })
        })
    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting lessons list",
            status: "failure",
        });
    }

}


//create langauges
exports.createLesson = async (req, res) => {

    try {
        
        let newLesson = new Lesson({
            topic_id: req.body.topic,
            lesson_name: req.body.lesson_name,
            lesson_seq_no: req.body.seq_no,
            lesson_type: req.body.lesson_type,
            topic_type: req.body.topic_type, 
            createdAt: new Date()
        });

        await newLesson.save().then(async (data) => {

            if(data != null ){
                var newBlockTypes;
                if (data.lesson_type == "Text") {
                    newBlockTypes = new BlockType({
                        lesson_id: data._id,
                        text: req.body.text })
                } else if (data.lesson_type == "Checkbox") {
                    newBlockTypes = new BlockType({
                        lesson_id: data._id,
                        measure_checkbox: req.body.measure_checkbox})
                } else {
                    newBlockTypes = new BlockType({
                        lesson_id: data._id,
                        path: req.body.path })
                }

                await newBlockTypes.save().then((blockCallback) => {
                    res.status(200).json({
                        message: "Lesson added successfully",
                        status: "success"
                    })
                }).catch((err)=>{})
            }

                
            }).catch((error) => {
                res.status(200).json({
                    message: error.message,
                    status: "failure",
                    data: error
                })
            })
    }
    catch (err) {
        console.log("err", err)
    }

}


// //update lesson

exports.updateLesson = async (req, res) => {
    try {
        
        let updateLessons={
            topic_id: req.body.topic,
            lesson_name: req.body.lesson_name,
            lesson_seq_no: req.body.seq_no,
            lesson_type: req.body.lesson_type,
            topic_type: req.body.topic_type, 
            modifiedAt: new Date()
        }

        await Lesson.findByIdAndUpdate({ _id: req.params.id }, { $set: updateLessons},{ new: true })
            .then( (data) => {
                
                if(data != null ){
                    var updateBlockTypes;
                    if (data.lesson_type == "Text") {
                        updateBlockTypes ={
                            text: req.body.text,modifiedAt: new Date() }
                    } else if (data.lesson_type == "Checkbox") {
                        updateBlockTypes = {
                            measure_checkbox: req.body.measure_checkbox,modifiedAt: new Date()}
                    } else {
                        updateBlockTypes ={
                            path: req.body.path ,modifiedAt: new Date()}
                    }
                    
                    BlockType.findOneAndUpdate({ lesson_id: data._id}, { $set: updateBlockTypes},{ new: true }).then((blockCallback) => {
                        res.status(200).json({
                            message: "Lesson updated successfully",
                            status: "success",
                        })
                    }).catch((err)=>{})
                }
            }).catch((error) => {
                console.log(error)
            })

    }
    catch (err) {
        res.status(200).json({
            message: "Error in updating lesson",
            status: "failure",
        });
    }

}


// //delete lessons

exports.deleteLesson = async (req, res) => {
    try {

        const getLessonById = await Lesson.findById({ _id: req.params.id });

        if (getLessonById != null) {
            let lessonDeleted = await Lesson.findByIdAndUpdate({ _id: req.params.id },{isdeleted:true});

            if(lessonDeleted){

                let lessonBlockTypeDeleted = await BlockType.updateMany({ lesson_id: lessonDeleted._id },{isdeleted:true});

                if(lessonBlockTypeDeleted){
                    res.status(200).json({
                        message: "Lesson deleted successfully",
                        status: "success"
                    });   
                }
            }

            
        } else {
            res.status(200).json({
                message: "Record not found",
                status: "failure"
            });
        }
    }
    catch (err) {
        res.status(200).json({
            message: "failure in deleting topic",
            status: "failure",
        });
    }

}


