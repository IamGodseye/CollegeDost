const mongoose = require('mongoose');


const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    expire_at:{
        type:Date,
        default:Date.now,
        expires: 600
    }

});


const Token = mongoose.model("Tokens",tokenSchema);
module.exports = Token;