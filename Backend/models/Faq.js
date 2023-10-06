const mongoose = require("mongoose");
const { Schema } = mongoose;

const FaqSchema = new Schema({
  
    question: { type: String, required: true },
    answer: { type: String, required: true },
    seq_no: { type: Number, required: true },
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

const Faqs = mongoose.model("admin_faqs", FaqSchema);

module.exports = Faqs;
