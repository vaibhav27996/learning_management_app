const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlockSchema = new Schema({
  
    lesson_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lessons"
    },
    text: { type: String },
    path: { type: String },
    measure_checkbox: { type: Boolean },
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

const BlockTypes = mongoose.model("block_types", BlockSchema);

module.exports = BlockTypes;
