const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const commentSchema = mongoose.Schema({


    commentedBy:{
        type: ObjectId,
        ref: "User"
    },

    postId:{
        type: ObjectId,
        ref: "UniversityPost"
    },

    commentedText:{
        type:String
    }



        
},{timestamps:true});

const UnivComment = mongoose.model("UnivComments",commentSchema);

module.exports = UnivComment;