var mongoose=require("mongoose");
// var Comment = require("./comments");
// var commentSchema = new mongoose.Schema({
//     text:String,
//     author:String
// });
var campSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    creater:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }  
});


module.exports= mongoose.model("Campground",campSchema);