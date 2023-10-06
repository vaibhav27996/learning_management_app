const Faq = require('../models/Faq');

//Fetch faq
exports.getFaq = async (req, res) => {
  
    try {
      

        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"question":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"answer":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }} ,
                        {"seq_no":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }} ,
                    ]
            })
        }
        if( req.query.question!="" && req.query.question!=null){
            match.$and.push({"question":{ $regex: ".*" + req.query.question + ".*", $options: 'i' }})
        }
        if(req.query.answer!="" && req.query.answer!=null){
            match.$and.push({"answer":{ $regex: ".*" + req.query.answer + ".*", $options: 'i' }})
        }
        if(req.query.seq_no!="" && req.query.seq_no!=null){
            match.$and.push({"seq_no":parseInt(req.query.seq_no)})
        }

        Faq.aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project:{
                    _id: "$_id",
                    question: "$question",
                    answer:"$answer",
                    seq_no: "$seq_no"
                }
            }
        ]).then((data)=>{
            res.status(200).json(data)  
        }).catch((err)=>{
            console.log("err",err);
        })
    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting faq list",
            status: "failure",
        });
    }

}


//create langauges
exports.createFaq = async (req, res) => {

    try {


        let newFaq = new Faq({
            question: req.body.question,
            answer: req.body.answer,
            seq_no: req.body.seq_no,
            createdAt: new Date()
        });

        await newFaq.save().then((data) => {
            res.status(200).json({
                message: "Faq added successfully",
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


//update langauges

exports.updateFaq = async (req, res) => {

    try {

        let updatedFaq ={
            question: req.body.question,
            answer: req.body.answer,
            seq_no: req.body.seq_no,
            modifiedAt: new Date()
        };

        await Faq.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedFaq }, { new: true }).then((data)=>{
            res.status(200).json({
                message: "Faq updated successfully",
                status: "success",
                data: data
            })

        }).catch((error)=>{
            console.log(error)
        })
        



    }
    catch (err) {
        res.status(200).json({
            message: err.message,
            status: "failure",
        });
    }

}


//delete langauges

exports.deleteFaq = async (req, res) => {
    try {

        const getFaqById = await Faq.findById({ _id: req.params.id });


        if (getFaqById != null) {
            let FaqDeleted = await Faq.findByIdAndUpdate({ _id: req.params.id },{isdeleted:true});

            res.status(200).json({
                message: "Faq deleted successfully",
                status: "success",
                data: FaqDeleted
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
            message: "failure in deleting Faq",
            status: "failure",
        });
    }

}


