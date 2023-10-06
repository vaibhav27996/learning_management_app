const mongoose = require("mongoose");
const { Schema } = mongoose;

const offerSchema = new Schema({
  
    name: { type: String, required: true },
    disc_percentage: { type: Number, required: true },

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

const Offer = mongoose.model("Offers", offerSchema);

module.exports = Offer;
