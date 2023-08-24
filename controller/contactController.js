const asyncHandler =require('express-async-handler');
const Contact = require("../models/contactModels")
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
        const contact = await Contact.create({name,email,phone});
        console.log("created.");
        res.status(201).json(contact);
   }
    
})

//@desc get contact with id
//@rout GET /api/contact/:id
//@access public
const getContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
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
    const contacts = await Contact.find();
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
    else if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All Fields Are Mandatory !");
    }
    else{
        const updatedContact = await Contact.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedContact);
    }
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
     else
     {
        const deletedContact = await Contact.findByIdAndDelete(id,contact);
        res.status(200).json(deletedContact);   
     }
})

module.exports={createContact,getContact,getContacts,updateContact,deleteContact};