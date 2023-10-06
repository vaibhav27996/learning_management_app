const Offer = require('../models/offers');
const moment = require('moment');

//Fetch offer
exports.getOffer = async (req, res) => {
    try {
     
        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"disc_percentage":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }}
                    ]
            })
        }

        if( req.query.name!="" && req.query.name!=null){
            match.$and.push({"name":{ $regex: ".*" + req.query.name + ".*", $options: 'i' }})
        }

        if(req.query.percentage!="" && req.query.percentage!=null){
            match.$and.push({"disc_percentage":parseInt(req.query.percentage)})
        }
     
        if ((req.query.start_date != "" && req.query.start_date !=undefined) && 
            (req.query.end_date != ""  && req.query.end_date !=undefined) ){
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
        }
        
        Offer.aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project:{
                    _id: "$_id",
                    name:"$name",
                    disc_percentage: "$disc_percentage",
                    start_date:"$start_date",
                    end_date:"$end_date",
                    createdAt:"$createdAt",
                    modifiedAt:"$modifiedAt"
                }
            }


        ]).then((data)=>{
            return res.status(200).json({
                message: "Offers list",
                status: "success",
                data: data
            })
        }).catch((err)=>{
            console.log("err",err);
        })  

    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting Offer list",
            status: "failure",
        });
    }

}


//create offer
exports.createOffer = async (req, res) => {

    try {

        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');
      
        let newOffer = new Offer({
            name: req.body.name, 
            disc_percentage:  req.body.disc_percentage,
            start_date: finalStartDate,
            end_date: finalEndDate,
            createdAt:new Date()
        });
        await newOffer.save().then((data) => {
                res.status(200).json({
                    message: "New Offer added successfully",
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


// //update offer

exports.updateOffer = async (req, res) => {
    try {

        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');

        let updateOffer={
            name: req.body.name, 
            disc_percentage:  req.body.disc_percentage,
            start_date: finalStartDate,
            end_date: finalEndDate,
            modifiedAt: new Date()
        }

        await Offer.findByIdAndUpdate({ _id: req.params.id }, { $set: updateOffer},{ new: true })
            .then((data) => {
                console.log(data)

                res.status(200).json({
                    message: "Offer updated successfully",
                    status: "success",
                    data: data
                })

            }).catch((error) => {
                console.log(error)
            })
    }
    catch (err) {
        res.status(200).json({
            message: "Error in updating Offer",
            status: "failure",
        });
    }

}


// //delete offer

exports.deleteOffer = async (req, res) => {
    try {

        const getOfferById = await Offer.findById({ _id: req.params.id });


        if (getOfferById != null) {
            let offerDeleted = await Offer.findByIdAndUpdate({ _id: req.params.id },{isdeleted:true});

            res.status(200).json({
                message: "Offer deleted successfully",
                status: "success",
                data: offerDeleted
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


