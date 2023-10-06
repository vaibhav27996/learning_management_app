const mongoose = require("mongoose");
const { Schema } = mongoose;

const TopicSchema = new Schema({
  
    topic_name: { type: String, required: true },
    descriptions: { type: String, required: true },
    seq_no: { type: String, required: true },
    lang_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Languages"
    },
    // type: { type: String, required: true },
    status: { type: String, required: true },
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

const Topic = mongoose.model("Topics", TopicSchema);

module.exports = Topic;
