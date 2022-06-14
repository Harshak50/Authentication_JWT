const mongoose = require('mongoose')
const apiSchema = mongoose.Schema({
    apiName:{
        type:String,
        required:true,
        unique:true
    },
    apiEndPoint:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    public:{
        type:Boolean,
        default:false
    },
    author:{
        required:true,
        type:String
    },
    //image
    imageUrl:{
        required:true,
        type:String
    },
    
})
var api = mongoose.model('Api',apiSchema);
module.exports = api;