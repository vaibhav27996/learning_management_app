const mongoose = require("mongoose");
const { Schema } = mongoose;

const LanguageSchema = new Schema({
  
    lang_name: { type: String, required: true },
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

const Language = mongoose.model("Languages", LanguageSchema);

module.exports = Language;
