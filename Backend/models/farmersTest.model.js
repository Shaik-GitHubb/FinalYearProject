import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    Location:{type:String,required:true}
})

export const farmerSch = mongoose.model('farmerSch',farmerSchema);