import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";


const postSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }],
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String
    }
},{
    timestamps:true
})

postSchema.plugin(aggregatePaginate);

export const Post=mongoose.model("Post",postSchema);