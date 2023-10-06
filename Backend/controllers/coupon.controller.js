const Coupon = require('../models/coupons');
const SubCoupon= require('../models/sub_coupons');
const moment =require('moment');
const { ObjectId } = require('mongodb');

//Fetch Coupon
exports.getCoupon = async (req, res) => {
  
    try {
        
        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"coupon_code_no":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }} ,
                        {"status":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }} ,
                        // {"percentage":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }}  

                    ]
            })
        }
        if( req.query.name!="" && req.query.name!=null){
            match.$and.push({"name":{ $regex: ".*" + req.query.name + ".*", $options: 'i' }})
        }
        if(req.query.percentage!="" && req.query.percentage!=null){
            match.$and.push({"percentage":parseInt(req.query.percentage)})
        }
        if(req.query.status!="" && req.query.status!=null){
            match.$and.push({"status":{ $regex: ".*" + req.query.status + ".*", $options: 'i' }})
        }
        if(req.query.code!="" && req.query.code!=null){
            match.$and.push({"coupon_code_no":{ $regex: ".*" + req.query.code + ".*", $options: 'i' }})
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
        


        Coupon.aggregate([
        
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project:{
                    _id: "$_id",
                    name: "$name",
                    coupon_code_no:"$coupon_code_no",
                    status: "$status",
                    startdate:"$start_date",
                    endDate:"$end_date",
                    percentage:"$percentage"
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
            message: "Error in getting coupon list",
            status: "failure",
        });
    }

}


//create coupon
exports.createCoupon = async (req, res) => {

    try {

        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');
        
        let newCoupon = new Coupon({
            name: req.body.name,
            coupon_code_no: req.body.coupon_code_no,
            status: req.body.status,
            start_date:finalStartDate,
            end_date:finalEndDate,
            percentage:req.body.percentage,
            createdAt: new Date()
        });


        await newCoupon.save().then((data) => {

            if(data){
                split_string = data.coupon_code_no.split(/(\d+)/)
               
                for(let i=1;i<=split_string[1];i++){
                    let new_sub_coupon=new SubCoupon({
                        coupon_id:data._id,
                        sub_coupon_code_no:split_string[0]+''+i,
                        sub_coupon_code_status:data.status,
                        start_date:finalStartDate,
                        end_date:finalEndDate,
                        percentage:req.body.percentage,
                    });

                    new_sub_coupon.save().then((callback)=>{ }).catch((err)=>{
                        console.log("err",err);
                    })
                }

                res.status(200).json({
                    message: "Coupon added successfully",
                    status: "success"
                })
                
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


//update coupon

exports.updateCoupon = async (req, res) => {

    try {

        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');

        let updatedcoupon ={
            name: req.body.name,
            coupon_code_no: req.body.coupon_code_no,
            status: req.body.status,
            start_date:finalStartDate,
            end_date:finalEndDate,
            percentage:req.body.percentage,
            modifiedAt: new Date()
        };

        await Coupon.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedcoupon }, { new: true }).then(async (data)=>{

            if(data){

                const SubCouponDelete= await SubCoupon.updateMany({coupon_id:data._id},{$set:{isdeleted:true}},{ new: true } );
                console.log(SubCouponDelete);
                
              
                for(let i=1;i<=data.coupon_code_no;i++){
                    let new_sub_coupon=new SubCoupon({
                        coupon_id:data._id,
                        sub_coupon_code_no:i,
                        sub_coupon_code_status:data.status,
                        start_date:finalStartDate,
                        end_date:finalEndDate,
                        percentage:req.body.percentage,
                    });

                    new_sub_coupon.save().then((callback)=>{ }).catch((err)=>{
                        console.log("err",err);
                    })
                }

                res.status(200).json({
                    message: "Coupon updated successfully",
                    status: "success"
                })
                
            }
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


//delete coupons

exports.deleteCoupon = async (req, res) => {
    try {

        const getCouponById = await Coupon.findById({ _id: req.params.id });
        if (getCouponById != null) {
            let couponDeleted = await Coupon.findByIdAndUpdate({ _id: req.params.id },{$set:{isdeleted:true}});
            
            if(couponDeleted){
                await SubCoupon.updateMany({coupon_id:couponDeleted._id},{$set:{isdeleted:true}}).then((callback)=>{}).catch((err)=>{
                    console.log("err",err);
                })

                res.status(200).json({
                    message: "Coupon deleted successfully",
                    status: "success"
                });
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
            message: "failure in deleting coupon",
            status: "failure",
        });
    }

}



exports.getSubCoupons= async (req,res)=>{
    try {
       
    
        var match = {
            $and: [{ isdeleted: false }, {
                coupon_id: new ObjectId(req.params.id)
            }]
        };

        if (req.query.search != "" && req.query.search != null) {
            match.$and.push({
                $or: [
                    { "sub_coupon_code_no": { $regex: ".*" + req.query.search + ".*", $options: 'i' } },
                    { "sub_coupon_code_status": { $regex: ".*" + req.query.search + ".*", $options: 'i' } }
                ]
            })
        }
        if (req.query.name != "" && req.query.name != null) {
            match.$and.push({ "sub_coupon_code_no": { $regex: ".*" + req.query.name + ".*", $options: 'i' } })
        }
        if (req.query.status != "" && req.query.status != null) {
            match.$and.push({ "sub_coupon_code_status": { $regex: ".*" + req.query.status + ".*", $options: 'i' } })
        }

        if ((req.query.start_date != "" && req.query.start_date != undefined) &&
            (req.query.end_date != "" && req.query.end_date != undefined)) {
            var finalStartDate = moment(req.query.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
            var finalEndDate = moment(req.query.end_date, 'D/M/YYYY').format('YYYY-MM-DD');

            match.$and.push({
                $and: [
                    {
                        start_date: { $gte: new Date(finalStartDate) },
                    },
                    {
                        end_date: { $lte: new Date(finalEndDate) },
                    }
                ],
            });
        }


        SubCoupon.aggregate([
            {
                $lookup: {
                    from: "coupons",
                    localField: "coupon_id",
                    foreignField: "_id",
                    as: "subCoupon"
                }
            },
            { $match: match },
            {
                $project: {
                    _id: "$_id",
                    couponId: "$coupon_id",
                    name: { $arrayElemAt: ["$subCoupon.name", 0] },
                    coupon_code_no: "$sub_coupon_code_no",
                    status: "$sub_coupon_code_status",
                    startdate: "$start_date",
                    endDate: "$end_date",
                    percentage: "$percentage",
                    isdeleted:"$isdeleted"
                }
            }


        ]).then((data) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return res.status(200).json({ status: "failure", message: "error getting coupon list", error: err })
        })
        
    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting sub coupon list",
            status: "failure",
        });
    }
}


exports.deleteSubCoupons= async (req,res)=>{

    try{

        let subCouponId= req.params.id;

        const getSubCouponById= await SubCoupon.find({_id:subCouponId,isdeleted:false});
    
        if(getSubCouponById!=""){

            const deleteSubCoupon= await SubCoupon.findByIdAndUpdate({_id:subCouponId},{$set:{isdeleted:true}});

            if(deleteSubCoupon){
                return res.status(200).json({
                    message: "Sub coupon deleted successfully",
                    status: "success",
                });
            }
        }else{
            return res.status(200).json({
                message: "Sub coupon does not exists",
                status: "failure",
            });
        }

    }  catch (err) {
        res.status(200).json({
            message: "Error in getting sub coupon",
            status: "failure",
        });
    }
    
}

exports.updateSubCoupons= async (req,res)=>{
    try {

        var finalStartDate = moment(req.body.start_date, 'D/M/YYYY').format('YYYY-MM-DD');
        var finalEndDate = moment(req.body.end_date, 'D/M/YYYY').format('YYYY-MM-DD');

        let updatedSubCoupon ={
            sub_coupon_code_no: req.body.sub_coupon_code_no,
            sub_coupon_code_status: req.body.status,
            start_date:finalStartDate,
            end_date:finalEndDate,
            percentage:req.body.percentage,
            modifiedAt: new Date()
        };

        await SubCoupon.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedSubCoupon }, { new: true }).then(async (data)=>{

            if(data){
                res.status(200).json({
                    message: "Sub coupon updated successfully",
                    status: "success"
                })
                
            }
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
