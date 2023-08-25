const mongoose =require("mongoose");

userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Add User Details."]
    },
    email:{
        type:String,
        required:[true,"Please Add User Email."],
        unique:[true,"Email Already Taken."]
    },
    password:{
        type:String,
        required:[true,"Please Add Password."]
    }

},
{
    timestamp:true
});

module.exports = mongoose.model("users",userSchema);