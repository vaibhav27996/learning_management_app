const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
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
    isdeleted:{type:Boolean,default:false}

},{
    timestamps: true
});

const Subscription = mongoose.model("Subscriptions", SubscriptionSchema);

module.exports = Subscription;
