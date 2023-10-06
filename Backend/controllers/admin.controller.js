const Admin = require('../models/admins');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const passport =require('passport');
const jwt =require('jsonwebtoken');

exports.login=async (req, res) => {
    try {

        var loginCredentials = {  
            email: req.body.email,
            password: req.body.password,
        }

        const getAdminUser= await Admin.findOne({email:loginCredentials.email});

        if(getAdminUser==null){
            res.status(200).json({
                message: "Invalid email and password",
                status: "failure",
            }); 
        }else{


            if(bcrypt.compareSync(loginCredentials.password, getAdminUser.password)){

                var privateKey = "sdfsfsdf23wedsadr323rwewaedc2r34vrerfsdfertvsdfqwaercfwevavf";
                let params = {
                    email: getAdminUser.email,
                    name: getAdminUser.name

                }
                var token = await jwt.sign(params, privateKey, { expiresIn: '300s' });
                console.log("token", token);

                res.status(200).json({
                    message: "Login successfully",
                    status: "success",
                    token:token
                }); 
              
            }else{
                res.status(200).json({
                    message: "Password is invalid",
                    status: "failure",
                }); 
            }
        }
    }
    catch (err) {
        res.status(200).json({
            message: "Error in getting admin datas",
            status: "failure",
        });
    }
}

//Fetch admin
exports.getAdmins = (req, res) => {
    try {

        var match = { $and: [{ isdeleted: false }] };

        if(req.query.search!="" && req.query.search!=null){
            match.$and.push({
                $or :[ 
                        {"name":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"email":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"mob_no":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                        {"gender":{ $regex: ".*" + req.query.search + ".*", $options: 'i' }},
                    ]
            })
        }
        if(req.query.name!="" && req.query.name!=null){
            match.$and.push({"name":{ $regex: ".*" + req.query.name + ".*", $options: 'i' }})
        }
        if(req.query.email!="" && req.query.email!=null){
            match.$and.push({"email":{ $regex: ".*" + req.query.email + ".*", $options: 'i' }})
        }
        if(req.query.mob_no!="" && req.query.mob_no!=null){
            match.$and.push({"mob_no":parseInt(req.query.mob_no)})
        }
        if(req.query.gender!="" && req.query.gender!=null){
            match.$and.push({"gender":{ $regex: ".*" + req.query.gender + ".*", $options: 'i' }})
        }


        Admin.aggregate([
            { $match: match },
            { $sort: { createdAt: -1 } },
            {
                $project:{
                    _id: "$_id",
                    name: "$name",
                    email:"$email",
                    mobileNo: "$mob_no",
                    address:"$address",
                    isActive:"$isActive",
                    gender:"$gender"
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
            message: "Error in getting admin list",
            status: "failure",
        });
    }

}


//create admin
exports.createAdmin = async (req, res) => {

    try {

        const hashedpassword = bcrypt.hashSync(req.body.password, saltRounds, function (err, hash) {});
        let newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            mob_no: req.body.mob_no,
            address: req.body.address,
            gender: req.body.gender,
            password: hashedpassword,
            createdAt: new Date()
        });

        await newAdmin.save().then((data) => {
            res.status(200).json({
                message: "Admin added successfully",
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


//update admin

exports.updateAdmin = async (req, res) => {
    try {
        
        const getAdminById = await Admin.findById({ _id: req.params.id }); 
        if (getAdminById) {

            let updateAdminData={
                name: req.body.name,
                email: req.body.email,
                mob_no: req.body.mob_no,
                address: req.body.address,
                gender: req.body.gender, 
                modifiedAt: new Date()
            }

            await Admin.findByIdAndUpdate({ _id: req.params.id }, { $set:updateAdminData }, { new: true })
                .then((data) => {

                    res.status(200).json({
                        message: "Admin updated successfully",
                        status: "success",
                        data: data
                    })

                }).catch((error) => {
                    console.log(error)
                })
        }else{
            res.status(200).json({
                message: "Record not found",
                status: "failure",
            });
        }

        
    }
    catch (err) {
        res.status(200).json({
            message: "Error in updating admin",
            status: "failure",
        });
    }

}


// //delete admin

exports.deleteAdmin = async (req, res) => {
    try {

        const getAdminById = await Admin.findById({ _id: req.params.id });
        if (getAdminById) {
            let adminDeleted = await Admin.findByIdAndUpdate({ _id: req.params.id },{isdeleted:true});

            res.status(200).json({
                message: "Admin deleted successfully",
                status: "success",
                data: adminDeleted
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
            message: "failure in deleting admin",
            status: "failure",
        });
    }

}

exports.changePassword= async (req, res)=>{
    try {
        const getAdmin= await Admin.findById({ _id: req.params.id });
        if(getAdmin){
            
            if(req.body.new_password==req.body.confirm_password){
    
                if (bcrypt.compareSync(req.body.current_password, getAdmin.password)) {
                
                    const hashedpassword = bcrypt.hashSync(req.body.new_password,saltRounds,function(err,hash){
                
                    });
                   
                    var updateAdminPassword={
                        password:hashedpassword
                    }
                   
                    await Admin.findByIdAndUpdate({_id:req.params.id},{ $set:updateAdminPassword }, { new: true }).then((data)=>{
                        res.status(200).json({
                            message: "Password changed successfully",
                            status: "success",
                        });
                    }).catch((err)=>{ })
                   
                }
            }
        }
    }catch (err) {
        res.status(200).json({
            message: "failure in changing admin password",
            status: "failure",
        });
    }
}


exports.forgotPassword=async (req,res)=>{
    try{
        console.log("req.body",req.body)

        const findAdmin=await Admin.findOne({email:req.body.email});

        if(findAdmin==null){
            res.status(200).json({
                message: "Admin user does not exists",
                status: "failure",
            });
        }else{

            const hashedpassword = bcrypt.hashSync(req.body.password, saltRounds, function (err, hash) { });
            
            await Admin.findOneAndUpdate({ email: findAdmin.email }, { $set: { password: hashedpassword } }, { new: true }).then((callback) => {
                res.status(200).json({
                    message: "Admin forgot password added successfully",
                    status: "success",
                });
            }).catch((err) => {
                console.log("err",err)
            }) 
        }


    }catch (err) {
        res.status(200).json({
            message: "failure in forgot admin password",
            status: "failure",
        });
    }
}


exports.logout= (req,res)=>{
    try {

        req.session.destroy(function() {
            res.clearCookie('connect.sid');
            res.status(200).json({
                message: "Admin logout successfully",
                status: "success",
            });
        }); 
    }catch (err) {
        res.status(200).json({
            message: "failure in forgot admin password",
            status: "failure",
        });
    }
    
}