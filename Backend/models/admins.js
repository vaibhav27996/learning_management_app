const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mob_no: { type: Number, required: true, min: [15, "Minimum lenght is 15"] },
    address: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    gender: { type: String},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date
    },
    isdeleted:{type:Boolean,default:false}


},{
    timestamps: true
});

const Admin = mongoose.model("admin_users", AdminSchema);

module.exports = Admin;
