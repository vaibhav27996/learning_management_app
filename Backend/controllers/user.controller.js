const User = require('../models/users')

exports. getUserDetails = async(req, res) => {
    console.log("user ")
    const Users = await User.find();
    
    res.status(200).json(Users)
}