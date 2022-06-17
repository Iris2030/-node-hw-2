const {Schema, model} = require("mongoose")

const schema =  new Schema({
email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
},{timestamps:true});



const User = model('user', schema)

module.exports = User
