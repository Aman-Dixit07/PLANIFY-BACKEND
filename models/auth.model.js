import mongoose from "mongoose";

//creating the schema
const authSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        unique : true,
        required : true
    },
    password : { 
        type:String,
        required:true
    }
},
{timestamps:true}
)

//creating the model 

const model = mongoose.model("Auth",authSchema);

export default model;