const asyncHandler =require('express-async-handler');
const Contact = require("../models/contactModel");
const { default: mongoose } = require('mongoose');
//@desc create contact
//@rout POST /api/contact
//@access public
const createContact =asyncHandler(async(req,res)=>{
    const {name,email,phone}= req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All Fields Are Mandatory !");
    }
   else
   {
        const contact = await Contact.create({name,email,phone,user_id:req.user.id});
        console.log("created.");
        res.status(201).json(contact);
   }
    
})

//@desc get contact with id
//@rout GET /api/contact/:id
//@access public
const getContact =asyncHandler(async(req,res)=>{
    const objectid =new mongoose.Types.ObjectId(req.params.id);
    const contact = await Contact.find(objectid);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found.");
    }
    res.status(200).json(contact);
    })

//@desc get all Contacts
//@rout GET /api/contacts
//@access public
const getContacts =asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json({contacts});
})

//@desc update contact
//@rout PUT  /api/contact/:id
//@access public
const updateContact =asyncHandler(async(req,res)=>{
    const id =req.params.id;
    const {name,email,phone}= req.body;

    const contact = await Contact.findById(id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found.");   
     }

    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All Fields Are Mandatory !");
    }
     if(contact.user_id.toString()!==req.user.id)
     {
        res.status(403);
        throw new Error("User Dont have Permission to modify this contact");
     }
        const updatedContact = await Contact.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedContact);
    
})

//@desc delete  contact
//@rout delete /api/contact/:id
//@access public
const deleteContact =asyncHandler(async(req,res)=>{
    const id = req.params.id;

    const contact = await Contact.findById(id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found.");   
     }
    
     if(contact.user_id.toString()!==req.user.id)
        {
           res.status(403);
           throw new Error("User Dont have Permission to modify this contact");
        }
        const deletedContact = await Contact.findByIdAndDelete(id,contact);
        res.status(200).json(deletedContact);   
     
})

module.exports={createContact,getContact,getContacts,updateContact,deleteContact};