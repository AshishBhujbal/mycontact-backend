const asyncHandler = require("express-async-handler");
const User =require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// @dec to register the user
// @route post api/users/register
//@access public
const registerUser =asyncHandler(async(req,res)=>
{
    const {username,email,password}= req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All Fileds Are Mandatory!");
    }

    // check if already user exist with given email
    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User Already Registered.");
    }
    // hash a password and create new user in database
    const hashedPassword = await bcrypt.hash(password,10);
    // console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    // check if user created and return user
    if(user)
    {
        res.status(201).json({_id:user._id,username:user.username,email:user.email});
    }
    else
    {
        res.status(400)
        throw new Error("User Details Is Not Valid.");
    }
});

// @dec to login the user
// @route post api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>
{
    const{email,password}= req.body;

    if(!email || !password)
    {
        res.status(400);
        throw new Error("All Fields Are Mandatory!");
    }

    const user =await User.findOne({email});

    //if user exists compare password with hashed password
    if(user && await bcrypt.compare(password,user.password))
    {
        const accessToken = jwt.sign({
                                        user:{
                                            username:user.username,
                                            email:user.email,
                                            id:user._id
                                            }
                                       }, 
                                        process.env.ACCESS_TOKEN_SECREATE,
                                        {expiresIn:'15m'}
                                    );

         res.status(200).json({accessToken});  
    }
    else
    {
        res.status(401);
        throw new Error("Email Or Password Not Valid.");
    }
});

// @dec to login the user
// @route post api/users/login
//@access public
const currentUser = asyncHandler(async(req,res)=>
{
    res.status(200).json(req.user);
});

module.exports={registerUser,loginUser,currentUser};