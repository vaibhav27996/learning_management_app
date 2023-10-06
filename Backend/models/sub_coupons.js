const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCouponSchema = new Schema({
  
    coupon_id: { type:mongoose.Schema.Types.ObjectId,
        ref: "Coupons"},
    sub_coupon_code_no: { type: String, required: true },
    sub_coupon_code_status: { type: String },
    start_date:{   
        type:Date
    },
    end_date:{   
        type:Date
    },
    createdAt:{ type:Date },
    modifiedAt:{ type:Date },
    percentage: {type:Number},
    isdeleted:{type:Boolean, default:false}
},{
    timestamps: true
});

const subCoupons = mongoose.model("sub_coupons", subCouponSchema);

module.exports = subCoupons;
