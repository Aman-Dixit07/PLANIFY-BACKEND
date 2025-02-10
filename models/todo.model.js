import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
    },
    isComplete:{
        type:Boolean,
        default:false,
    },
    creator :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true,
    } 
},
{timestamps:true}
)

const model = mongoose.model("Todo",todoSchema);

export default model;