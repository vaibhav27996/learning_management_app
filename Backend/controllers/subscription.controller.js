const Subscription = require('../models/subscriptions');
const moment = require('moment');

//Fetch langauges
exports.getSubscription = async (req, res) => {
    try {

       
        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"duration":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"amount":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }} 
                    ]
            })
        }

        if(req.query.name!="" && req.query.name!=null){
            match.$and.push({"name":{ $regex: ".*" + req.query.name + ".*", $options: 'i' }})
        }
        if(req.query.durations!="" && req.query.durations!=null){
            match.$and.push({"duration":parseInt(req.query.durations)})
        }
        if (req.query.amount != "" && req.query.amount != undefined) {
            match.$and.push({ "amount":parseInt(req.query.amount)});
        }

      


        if (req.query.start_date != "" && req.query.end_date != "" ) {
            
            var finalStartDate = moment(req.query.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
            var finalEndDate = moment(req.query.end_date, 'D/M/YYYY').format('YYYY-MM-DD');
           
            match.$and.push({ 
                $and: [ 
                    {
                      start_date: {$gte: new Date(finalStartDate)},
                    },
                    {
                      end_date: { $lte:new Date(finalEndDate)},
                    }
                  ],
            });

            // const innerArray = match.$and[1].$and;
        }
      

        Subscription.aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project:{
                    _id: "$_id",
                    name:"$name",
                    duration: "$duration",
                    type:"$type",
                    amount: "$amount",
                    start_date:"$start_date",
                    end_date:"$end_date"
                }
            }


        ]).then((data)=>{
            res.status(200).json({
                message: "Subscription list",
                status: "success",
                data: data
            })
        }).catch((err)=>{
            console.log("err",err);
        })  



    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting subscription list",
            status: "failure",
        });
    }

}


//create langauges
exports.createSubscription = async (req, res) => {

    try {
        
        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');


        let newSubscription = new Subscription({
            name: req.body.name, 
            duration:  req.body.durations,
            type:req.body.type,
            amount: req.body.amount,
            start_date: finalStartDate,
            end_date: finalEndDate,
            createdAt:new Date()
        });

        console.log("newSubscription",newSubscription);
        await newSubscription.save().then((data) => {
                res.status(200).json({
                    message: "New subscription added successfully",
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

exports.updateSubscription = async (req, res) => {
    try {

        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');


        let updateSubscription={
            name: req.body.name, 
            duration:  req.body.durations,
            type:req.body.type,
            amount: req.body.amount,
            start_date: finalStartDate,
            end_date: finalEndDate,
            modifiedAt: new Date()
        }

        await Subscription.findByIdAndUpdate({ _id: req.params.id }, { $set: updateSubscription}, { new: true })
            .then((data) => {

                res.status(200).json({
                    message: "Subscription updated successfully",
                    status: "success",
                    data: data
                })

            }).catch((error) => {
                console.log(error)
            })
    }
    catch (err) {
        res.status(200).json({
            message: "Error in updating Subscription",
            status: "failure",
        });
    }

}


// //delete langauges

exports.deleteSubscription = async (req, res) => {
    try {

        const getSubscriptionById = await Subscription.findById({ _id: req.params.id });
    
        if (getSubscriptionById != null) {
            let subscriptionDeleted = await Subscription.findByIdAndUpdate({ _id: req.params.id },{ isdeleted:true });

            res.status(200).json({
                message: "Subscription deleted successfully",
                status: "success",
                data: subscriptionDeleted
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
            message: "failure in deleting subscription",
            status: "failure",
        });
    }

}


