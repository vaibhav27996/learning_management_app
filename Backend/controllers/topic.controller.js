const Topic = require('../models/topics');

//Fetch langauges
exports.getTopics = async (req, res) => {
    try {
        
        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"topic_name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"descriptions":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"seq_no":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"descriptions":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }}  
                    ]
            })
        }

        if(req.query.name!="" && req.query.name!=null){
            match.$and.push({"topic_name":{ $regex: ".*" + req.query.name + ".*", $options: 'i' }})
        }
        if(req.query.desc!="" && req.query.desc!=null){
            match.$and.push({"descriptions":{ $regex: ".*" + req.query.desc + ".*", $options: 'i' }})
        }
        if (req.query.lang != "" && req.query.lang != undefined) {
            match.$and.push({ "language.lang_name":req.query.lang });
        }

      
        Topic.aggregate([

            {
                $lookup:{
                    from:"languages",
                    localField:"lang_id",
                    foreignField:"_id",
                    as:"language"
                }
            },
        
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project:{
                    _id: "$_id",
                    languageData:"$language",
                    name: "$topic_name",
                    descriptions:"$descriptions",
                    status: "$status",
                    seq_no:"$seq_no"
                }
            }


        ]).then((data)=>{
            return res.status(200).json(data)
        }).catch((err) => {
            return res.status(200).json({ status: "failure", message: "error getting coupon list", error: err })
        })


    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting language list",
            status: "failure",
        });
    }

}


//create langauges
exports.createTopic = async (req, res) => {

    try {
        let newTopic = new Topic({
            topic_name: req.body.topic_name,
            descriptions: req.body.descriptions,
            seq_no: req.body.seq_no,
            lang_id: req.body.lang_id,
            type: req.body.type, 
            status: req.body.status, 
            createdAt: new Date()
        });

        await newTopic.save().then((data) => {
                res.status(200).json({
                    message: "Topic added successfully",
                    status: "success",
                    data: data

                })
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


// //update langauges

exports.updateTopic = async (req, res) => {
    try {
        console.log("req.params", req.params.id);
        console.log("req.body", req.body);

        let updateTopic={
            topic_name: req.body.topic_name,
            descriptions: req.body.descriptions,
            seq_no: req.body.seq_no,
            lang_id: req.body.lang_id,
            type: req.body.type, 
            status: req.body.status, 
            modifiedAt: new Date()
        }

        await Topic.findByIdAndUpdate({ _id: req.params.id }, { $set: updateTopic},{ new: true })
            .then((data) => {

                res.status(200).json({
                    message: "Topic updated successfully",
                    status: "success",
                    data: data
                })

            }).catch((error) => {
                console.log(error)
            })

    }
    catch (err) {
        res.status(200).json({
            message: "Error in updating topic",
            status: "failure",
        });
    }

}


// //delete langauges

exports.deleteTopic = async (req, res) => {
    try {

        const getTopicById = await Topic.findById({ _id: req.params.id });
        if (getTopicById != null) {
            let topicDeleted = await Topic.findByIdAndUpdate({ _id: req.params.id },{isdeleted:true});

            res.status(200).json({
                message: "Topic deleted successfully",
                status: "success"
            });
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


