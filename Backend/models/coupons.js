const mongoose = require("mongoose");
const { Schema } = mongoose;

const couponSchema = new Schema({
    name: { type: String, required: true },
    coupon_code_no: { type: String, required: true },
    status: { type: String, required: true },
    start_date:{   
        type:Date,
        require:true
    },
    end_date:{   
        type:Date,
        require:true
    },
    createdAt:{   
        type:Date,
        default:Date.now() 
    },
    modifiedAt:{
        type:Date
    },
    percentage: {type:Number, required:true},
    isdeleted:{type:Boolean, default:false}

},{
    timestamps: true
});

const Coupons = mongoose.model("Coupons", couponSchema);

module.exports = Coupons;
