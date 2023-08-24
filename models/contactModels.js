const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
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