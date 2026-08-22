const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});


const User = new mongoose.model("User", userSchema);

User.plugin(passportLocalMongoose);

module.exports = User;