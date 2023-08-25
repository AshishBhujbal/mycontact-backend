const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please Add Contact Name."]
    },
    email:{
        type:String,
        required:[true,"Please Add Contact Email."]
    },
    phone:{
        type:String,
        required:[true,"Please Add Contact Phone number."]
    }
}, 
{
    timeStamp:true
})

module.exports= mongoose.model("contacts",contactSchema);