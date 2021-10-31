const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const commentSchema = mongoose.Schema({


    commentedBy:{
        type: ObjectId,
        ref: "User"
    },

    postId:{
        type: ObjectId,
        ref: "AllPost"
    },

    commentedText:{
        type:String
    }



        
},{timestamps:true});

const AllComment = mongoose.model("AllComments",commentSchema);

module.exports = AllComment;