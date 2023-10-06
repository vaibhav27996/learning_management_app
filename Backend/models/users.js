const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  age: { type: Number, required: true, min: [100, "Minimum price is 100"] },
  isdeleted:{type:Boolean,default:false}

});

const User = mongoose.model("users", UserSchema);

module.exports = User;
