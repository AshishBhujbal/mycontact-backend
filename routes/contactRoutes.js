const express = require('express');
const router = express.Router();
const {createContact,getContact,getContacts,updateContact,deleteContact}= require("../controller/contactController");

// get all conatcts and create
router.route('/').get(getContacts).post(createContact);
// get contact by id and update and delete
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports=router;