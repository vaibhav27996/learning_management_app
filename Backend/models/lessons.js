const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonSchema = new Schema({
  
    topic_id: { type: mongoose.Schema.Types.ObjectId,
        ref: "Topics"},
    lesson_name: { type: String, required: true },
    createdAt:{   
        type:Date,
        default:Date.now() 
    },
    modifiedAt:{
        type:Date
    },
    lesson_seq_no:{type: Number, required: true},
    topic_type:{type: String, required: true},
    lesson_type:{type: String},
    isdeleted:{type:Boolean,default:false}

    
},{
    timestamps: true
});

const Lessons = mongoose.model("Lessons", lessonSchema);

module.exports = Lessons;
